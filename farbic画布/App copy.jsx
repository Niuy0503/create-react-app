/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DownOutlined } from '@ant-design/icons';
import { Input, Layout, Tree, Row, Col, Form, Button } from 'antd';
// eslint-disable-next-line no-unused-vars
import { fabric } from 'fabric';
const { Header, Content } = Layout;
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];
export default function App() {
  const canvasRef = useRef()
  const [canvas, setCanvas] = useState();
  const [zoom, setZoom] = useState(1); // 缩放级别
  const [selectObj, setSelectObj] = useState(); // 当前选中的对象图层
  const [selectTool, setSelectTool] = useState(""); // 当前选择的绘图方式
  const [mouseFrom, setMouseFrom] = useState({ x: 0, y: 0 }); // 鼠标绘制起点
  const [mouseTo, setMouseTo] = useState({ x: 0, y: 0 }); // 鼠标绘制重点

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  useEffect(() => {
    // 初始化画布
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: "1250",
      height: "800",
      backgroundColor: "#ffffff"
    });
    setCanvas(canvas)
    console.log(canvas);
    // 引入平图
    fabric.Image.fromURL("https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800", (image) => {
      // 设置图片背景在水平方向上的缩放比例
      image.scaleX = canvas.width / image.width;
      // 设置图片背景在竖直方向上的缩放比例
      image.scaleY = canvas.height / image.height;
      canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
      canvas.hoverCursor = "default";
      canvas.renderAll();
    });
    // 初始化画布事件
    // 监听鼠标按下事件
    const obj = canvas.getActiveObject();
    canvas.on("mouse:down", (options) => {
      console.log(options);
      // 判断当前是否选择了toolTypes的操作
      // 记录当前鼠标的起点坐标 (减去画布在 x y轴的偏移，因为画布左上角坐标不一定在浏览器的窗口左上角)
      if (!obj) {
        setMouseFrom({ x: options.e.clientX - canvas._offset.left, y: options.e.clientY - canvas._offset.top });
      }
    })
    // 监听鼠标移动事件
    canvas.on("mouse:move", (options) => {
      // 如果当前正在进行绘图或移动相关操作
      // 记录当前鼠标移动终点坐标 (减去画布在 x y轴的偏移，因为画布左上角坐标不一定在浏览器的窗口左上角)
      setMouseTo({ x: options.e.clientX - canvas._offset.left, y: options.e.clientY - canvas._offset.top })
      initRect();
    });
    canvas.on("mouse:up", (options) => {
      if (!obj) {
        setMouseFrom({ x: options.e.clientX - canvas._offset.left, y: options.e.clientY - canvas._offset.top });
        resetMove()
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 因为画布会进行移动或缩放，所以鼠标在画布上的坐标需要进行相应的处理才是相对于画布的可用坐标
  const getTransformedPosY = (y) => {
    const vpt = canvas.viewportTransform
    return (y - vpt[5]) / zoom;
  };

  const getTransformedPosX = (x) => {
    const vpt = canvas.viewportTransform
    return (x - vpt[4]) / zoom;
  };

  // 绘制直线
  const initLine = () => {
    // 根据保存的鼠标起始点坐标 创建直线对象
    const canvasObject = new fabric.Line(
      [
        getTransformedPosX(mouseFrom.x),
        getTransformedPosY(mouseFrom.y),
        getTransformedPosX(mouseTo.x),
        getTransformedPosY(mouseTo.y),
      ],
    );
    // 绘制 图形对象
    startDrawingObject(canvasObject)
  };

  // 初始化 绘制矩形
  const initRect = () => {
    // 计算矩形长宽
    let left = getTransformedPosX(mouseFrom.x);
    let top = getTransformedPosY(mouseFrom.y);
    let width = mouseTo.x - mouseFrom.x;
    let height = mouseTo.y - mouseFrom.y;
    // 创建矩形 对象
    let canvasObject = new fabric.Rect({
      left: left,
      top: top,
      width: width,
      height: height,
    });
    // 绘制矩形
    startDrawingObject(canvasObject)
  };
  // 绘制图形
  const startDrawingObject = (canvasObject) => {
    // 禁止用户选择当前正在绘制的图形
    canvasObject.selectable = false;
    // 如果当前图形已绘制，清除上一次绘制的图形
    // 将绘制对象添加到 canvas中
    canvas.add(canvasObject);
    // 保存当前绘制的图形
  };
  // 清空鼠标移动记录 （起点 与 终点）
  const resetMove = () => {
    setMouseFrom({})
    setMouseTo({})
  };
  // 缩放按钮点击
  const tapScaleBtn = (flag) => {
    let zoom = canvas.getZoom()
    // flag -1 缩小 1 放大
    if (flag > 0) {
      // 放大
      zoom *= 1.1;
    } else {
      // 缩小
      zoom *= 0.9;
    }
    // zoom 不能大于 20 不能小于0.01
    zoom = zoom > 20 ? 20 : zoom;
    zoom = zoom < 0.01 ? 0.01 : zoom;
    canvas.setZoom(zoom);
  };
  // 监听画布重新绘制
  const tapClearBtn = () => {
    let children = canvas.getObjects()
    if (children.length > 0) {
      canvas.remove(...children)
    }
  };
  // 保存按钮点击
  const tapSaveBtn = () => {
    canvas.clone(cvs => {
      //遍历所有对对象，获取最小坐标，最大坐标
      let top = 0
      let left = 0
      let width = canvas.width
      let height = canvas.height

      var objects = cvs.getObjects();
      if (objects.length > 0) {
        var rect = objects[0].getBoundingRect();
        var minX = rect.left;
        var minY = rect.top;
        var maxX = rect.left + rect.width;
        var maxY = rect.top + rect.height;
        for (var i = 1; i < objects.length; i++) {
          rect = objects[i].getBoundingRect();
          minX = Math.min(minX, rect.left);
          minY = Math.min(minY, rect.top);
          maxX = Math.max(maxX, rect.left + rect.width);
          maxY = Math.max(maxY, rect.top + rect.height);
        }
        top = minY - 100
        left = minX - 100
        width = maxX - minX + 200
        height = maxY - minY + 200
        cvs.sendToBack(new fabric.Rect({
          left,
          top,
          width,
          height,
          stroke: 'rgba(0,0,0,0)',
          fill: this.bgColor,
          strokeWidth: 0
        }))
      }
      const dataURL = cvs.toDataURL({
        format: 'png',
        multiplier: cvs.getZoom(),
        left,
        top,
        width,
        height
      });
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  };
  const initSelect = () => {
    setSelectObj(canvas.getActiveObject());
    canvas.on("selection:created", (e) => {
      setSelectObj(e.target)
    })
  }

  return (
    <div className='main'>
      <div className='sider'>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
      <div className='content'>
        <Layout>
          <Header style={{ height: "100%", backgroundColor: "#fff" }}>
            <Form.Item label="楼栋基本信息" colon={false}>
            </Form.Item>
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item label="楼栋名称">
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="楼栋编码">
                  <Input></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={15}>
                <Form.Item
                  label="主数据物业类型"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Header>
          <p>分割线</p>

          <Content style={{ height: "1000px" }}>
            <Row>
              <Col span={15}>
                <Form.Item>
                  <Button onClick={initLine}>线条标记</Button>
                  <Button onClick={initRect}>矩形标记</Button>
                  <Button>输入备注</Button>
                  <Button>放大平图</Button>
                  <Button>缩小平图</Button>
                  <Button onClick={tapClearBtn}>清除当前标记</Button>
                  <Button>保存当前标记</Button>
                </Form.Item>
              </Col>
            </Row>
            <canvas ref={canvasRef}></canvas>
          </Content>
        </Layout>
      </div>
    </div>
  )
}

