/* eslint-disable no-unreachable */

import React, { Component } from 'react'
import './App.css';
import { DownOutlined } from '@ant-design/icons';
import { Input, Layout, Tree, Row, Col, Form, Button, Space } from 'antd';
// eslint-disable-next-line no-unused-vars
import { fabric } from 'fabric';
import imgsrc from './images/test.png';
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasObj: [], // canvas所有的图层对象
      selectObj: null, // 当前选中的对象图层
      selectTool: "", // 当前选择的绘图方式
      zoom: 1, // 缩放级别
      mouseFrom: {}, // 绘制起点
      mouseTo: {}, // 绘制终点
      IsRedoing: false, // 是否在执行撤销或重做操作
      OperationArray: [], // 当前画布的操作记录
      OperationIndex: 0, // 当前操作步数
      IptFlag: true, // 备注输入框的显隐
      IptValue: "", // 备注输入框的内容
    };
    this.canvasRef = React.createRef()
    this.iptRef = React.createRef()
  };
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  componentDidMount() {
    // 初始化画布
    this.canvas = new fabric.Canvas(this.canvasRef.current, {
      width: "1250",
      height: "800",
      backgroundColor: "#ffffff"
    });
    // 引入平图
    fabric.Image.fromURL(imgsrc, (image) => {
      image.set({
        scaleX: this.canvas.width / image.width,
        scaleY: this.canvas.height / image.height,
      });
      this.canvas.setBackgroundImage(image, this.canvas.renderAll.bind(this.canvas));
      this.canvas.renderAll();
    });
    // 监听鼠标按下事件
    this.canvas.on("mouse:down", (options) => {
      let e = options.e;
      if (e.ctrlKey === true) {
        this.isDragging = true;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      } else {
        if (this.state.selectTool === 'rect') {
          this.setState({
            mouseFrom: options.absolutePointer
          })
        } else if (this.state.selectTool === 'mark' && !this.state.canvasObj.markid) {
          const mark = new fabric.Circle({
            left: options.pointer.x / this.state.zoom,
            top: options.pointer.y / this.state.zoom,
            radius: 5,
            fill: '#FF69B4',
          })
          this.canvas.add(mark)
          // 保存标记到state中
          const MarkObjects = [
            ...this.state.canvasObj,
            { markid: 1, left: mark.left, top: mark.top, width: mark.radius * 2, height: mark.radius * 2 },
          ]
          console.log(MarkObjects);
          this.setState({
            canvasObj: MarkObjects,
            selectObj: mark,
          })
          // const MarkList = this.state.canvasObj.map(item => item.markid)
        }
      }
    })
    // 监听鼠标移动事件
    this.canvas.on("mouse:move", (options) => {
      if (this.isDragging) {
        var e = options.e;
        var vpt = this.canvas.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.canvas.requestRenderAll();
      }
    });
    // 监听鼠标弹起事件
    this.canvas.on("mouse:up", (options) => {
      if (this.state.selectTool === 'rect') {
        this.setState({
          mouseTo: options.absolutePointer
        }, () => {
          this.initRect()
        })
      }
      this.isDragging = false;
    });
    // 监听鼠标滚轮事件
    this.canvas.on("mouse:wheel", (options) => {
      let delta = options.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.setState({
        zoom: zoom
      })
      // this.canvas.setZoom(zoom)
      this.canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);
      options.e.preventDefault();
      options.e.stopPropagation();
    });
    // 监听画布渲染完成
    this.canvas.on("after:render", () => {
      if (!this.state.IsRedoing) {
        // 当前不是进行撤销或重做操作
        // 在绘画时会频繁触发该回调，所以间隔1s记录当前状态
        if (this.recordTimer) {
          clearTimeout(this.recordTimer);
          this.recordTimer = null;
        };
        this.recordTimer = setTimeout(() => {
          this.state.OperationArray.push(JSON.stringify(this.canvas));
          this.state.OperationIndex++;
        }, 100);
        // console.log(this.state.OperationArray);
        // console.log(this.state.OperationIndex);
      } else {
        // 当前正在执行撤销或重做操作，不记录重新绘制的画布
        this.setState({
          IsRedoing: false,
        })
      }
    });
    // 监听图层首次获得焦点
    // 一个图层获得焦点时，点击另一个图层不会触发，要先失焦再点击图层才能重新触发
    // 可鼠标点击框选，同时选中多个图层
    this.canvas.on('selection:created', (e) => {
      const { selected } = e;
      console.log('图层首次被选中');
      if (selected) {
        this.canvas.getActiveObject().set('fill', 'red');
        this.canvas.requestRenderAll();
        this.setState({
          IptFlag: false,
        })
      };
    });
    // 监听图层选中切换
    // 首次选中图层不触发 | 选中图层 - 失焦 - 再次选中 不触发
    // 选中一个图层or选中另一个图层 触发
    this.canvas.on('selection:updated', (e) => {
      const { selected, deselected } = e;
      if (selected) {
        this.canvas.getActiveObject().set('fill', 'red')
          // this.canvas.getObjects().map(item => {
          //   if(this.canvas.getActiveObject()) {
          //     item.fill = 'red';
          //     deselected[0].fill = 'pink';
          //   }
          //   this.canvas.renderAll()
          // });
          // deselected[0].fill = 'pink';
          // deselected[0].fill = 'blue';
          deselected[0].set('fill', '#FFA500');
          this.canvas.renderAll();
          this.iptRef.current.input.value = '';
          this.setState({
            IptFlag: false,
          });
        };
      console.log({ desc: '上次选中的图层', deselected });
      console.log({ desc: '这次选中的图层', selected });
    });
    // 监听图层取消选中
    this.canvas.on('selection:cleared', (e) => {
      const { deselected } = e;
      deselected[0].set('fill', '#FFA500');
      this.canvas.requestRenderAll();
      this.setState({
        IptFlag: true,
      });
      console.log({ desc: '取消选中的图层', deselected });
    });
    // 监听对象移动不超过画布范围
    this.canvas.on('object:moving', (e) => {
      let obj = e.target;
      if (!obj) return;
      if (
        obj.currentHeight > obj.canvas.height ||
        obj.currentWidth > obj.canvas.width
      ) {
        return;
      }
      obj.setCoords();
      // top-left corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (
        obj.getBoundingRect().top + obj.getBoundingRect().height >
        obj.canvas.height ||
        obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width
      ) {
        obj.top = Math.min(
          obj.top,
          obj.canvas.height -
          obj.getBoundingRect().height +
          obj.top -
          obj.getBoundingRect().top
        );
        obj.left = Math.min(
          obj.left,
          obj.canvas.width -
          obj.getBoundingRect().width +
          obj.left -
          obj.getBoundingRect().left
        );
      }
    });
  };

  // 初始化 绘制矩形
  initRect = () => {
    if (JSON.stringify(this.state.mouseFrom) === JSON.stringify(this.state.mouseTo) || this.state.canvasObj.rectid) {
      return
    }
    // 计算矩形长宽
    let top = Math.min(this.state.mouseFrom.y, this.state.mouseTo.y) / this.state.zoom
    let left = Math.min(this.state.mouseFrom.x, this.state.mouseTo.x) / this.state.zoom
    let width = Math.abs(this.state.mouseFrom.x - this.state.mouseTo.x) / this.state.zoom
    let height = Math.abs(this.state.mouseFrom.y - this.state.mouseTo.y) / this.state.zoom
    // 创建矩形 对象
    let rect = new fabric.Rect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: "#FFA500",
      stroke: '#000',
      strokeWidth: 2,
    });
    // 绘制矩形
    this.canvas.add(rect);
    const RectObjects = [
      ...this.state.canvasObj,
      { rectid: 2, left: rect.left, top: rect.top, width: rect.width, height: rect.height },
    ]
    this.setState({
      canvasObj: RectObjects,
      selectObj: rect,
      mouseFrom: {},
      mouseTo: {}
    })

  };
  // 缩放按钮
  ScaleBtn = (flag) => {
    let zoom = this.canvas.getZoom()
    // flag为-1时缩小，1是放大
    if (flag > 0) {
      // 放大
      this.setState({
        zoom: zoom + 0.1
      }, () => {
        this.canvas.setZoom(this.state.zoom)
      })
    } else {
      // 缩小
      this.setState({
        zoom: zoom - 0.1,
      }, () => {
        this.canvas.setZoom(this.state.zoom)
      })
    }
  };
  // 保存画布按钮
  SaveBtn = () => {
    const CanvasMsg = this.canvas.toJSON();
    sessionStorage.setItem('CanvasMessage', JSON.stringify(CanvasMsg));
  };
  // 恢复画布信息
  RestoreCanvas = () => {
    this.canvas.loadFromJSON(JSON.parse(sessionStorage.getItem('CanvasMessage')), () => {
      this.canvas.requestRenderAll();
    });
  }
  // 标记和绘制矩形按钮切换
  SwitchMode = (mode) => {
    this.setState({
      selectTool: mode
    })
  }
  // 清除选中图层对象
  ClearSelected = (flag) => {
    // flag为1时，清除选中图层对象，-1时清除全部
    if (flag === 1) {
      const selectObj = this.canvas.getActiveObject()
      console.log(selectObj);
      this.canvas.remove(selectObj)
      this.canvas.requestRenderAll()
    } else {
      let children = this.canvas.getObjects()
      if (children.length > 0) {
        this.canvas.remove(...children)
      }
    }
  }
  // 将画布导出为png
  ExportImage = () => {
    this.canvas.clone(cvs => {
      //遍历所有对对象，获取最小坐标，最大坐标
      let top = 0
      let left = 0
      let width = this.canvas.width
      let height = this.canvas.height

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
        top = this.canvas.top
        // minY - 100
        left = this.canvas.left
        // minX - 100
        width = this.canvas.width
        // maxX - minX + 200
        height = this.canvas.height
        // maxY - minY + 200
        cvs.sendToBack(new fabric.Rect({
          left,
          top,
          width,
          height,
          stroke: 'rgba(0,0,0,0)',
          strokeWidth: 1
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
  }
  // 撤销重做
  RevocateRedo = (flag) => {
    this.setState({
      IsRedoing: true,
    })
    let index = this.state.OperationIndex + flag;
    // 判断是否已经到了第一步操作
    if (index < 0) return;
    // 判断是否已经到了最后一步操作
    if (index >= this.state.OperationArray.length) return;
    if (this.state.OperationArray[index]) {
      this.canvas.loadFromJSON(this.state.OperationArray[index])
      if (this.canvas.getObjects().length > 0) {
        this.canvas.getObjects().map(item => item.set('selectable', false))
      }
      this.setState({
        OperationIndex: index,
      });
    }
  };
  // 输入备注触发添加到图层文字
  ChangeIptVal = () => {
    console.log(this.iptRef.current.input.value);
    console.log(this.canvas.getActiveObject());
    if(this.canvas.getActiveObject().radius) {
      let Ctext = new fabric.Text(this.iptRef.current.input.value, {
        fontSize: 18,
        left: this.canvas.getActiveObject().left - this.canvas.getActiveObject().radius * 4,
        top: this.canvas.getActiveObject().top + this.canvas.getActiveObject().radius * 2,
        fill: 'skyblue',
        textAlign: 'center',
        selectable: false,
        hoverCursor: 'default',
      });
      this.canvas.add(Ctext);
      this.canvas.requestRenderAll();
    } else {
      let Rtext = new fabric.Text(this.iptRef.current.input.value, {
        fontSize: 18,
        left: this.canvas.getActiveObject().left + this.canvas.getActiveObject().width / 4,
        top: this.canvas.getActiveObject().top + this.canvas.getActiveObject().height * 1.1,
        fill: 'red',
        textAlign: 'center',
        selectable: false,
        hoverCursor: 'default',
      })
      this.canvas.add(Rtext);
      this.canvas.requestRenderAll();
    }
  };

  render() {
    const MarkBtn =
      this.state.selectTool === 'mark' ?
        (<Button onClick={() => { this.SwitchMode('') }}>关闭打点标记</Button>)
        :
        (<Button onClick={() => { this.SwitchMode('mark') }}>打点标记</Button>)
    const RectBtn =
      this.state.selectTool === 'rect' ?
        (<Button onClick={() => { this.SwitchMode('') }}>关闭矩形标记</Button>)
        :
        (<Button onClick={() => { this.SwitchMode('rect') }}>矩形标记</Button>)

    return (
      <div className='main'>
        <div className='sider'>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={this.onSelect}
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
              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item
                    label="主数据物业类型"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="标记备注"
                  >
                    <Input ref={this.iptRef} allowClear disabled={this.state.IptFlag} onChange={this.ChangeIptVal}/>
                  </Form.Item>
                </Col>
              </Row>
            </Header>
            <p>分割线</p>

            <Content style={{ height: "1000px" }}>
              <Row>
                <Col span={15}>
                  <Form.Item>
                    <Space>
                      {MarkBtn}
                      {RectBtn}
                      <Button onClick={() => { this.ScaleBtn(1) }}>放大平图</Button>
                      <Button onClick={() => { this.ScaleBtn(-1) }}>缩小平图</Button>
                      <Button onClick={() => { this.ClearSelected(1) }}>清除当前标记</Button>
                      <Button onClick={() => { this.ClearSelected(-1) }}>清除全部标记</Button>
                      <Button onClick={this.SaveBtn}>保存图层标记</Button>
                      <Button onClick={this.RestoreCanvas}>恢复图层标记</Button>
                      <Button onClick={this.ExportImage}>导出图片</Button>
                      <Button onClick={() => {this.RevocateRedo(-1)}}>撤销</Button>
                      <Button onClick={() => {this.RevocateRedo(1)}}>重做</Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
              <canvas ref={this.canvasRef}></canvas>
            </Content>
          </Layout>
        </div>
      </div>
    )
  }
}


