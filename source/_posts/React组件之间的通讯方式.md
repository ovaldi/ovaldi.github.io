title: React组件之间的通讯方式
date: 2015-08-20
tags: React communication postal.js
---

本文大致梳理了一下React中组件之间的通讯方式，文中会以一个“列表搜索”的功能为示例，根据组件组合方式的不同，分别演示如何做组件之间的通讯。

### 相互独立的组件
对于那些相互之间比较独立的组件，我们可以使用 全局的事件/消息系统 来做组件之间的通讯，比如dojo中的[topic](https://github.com/dojo/dojo/blob/master/topic.js "dojo/topic"), 在这里，我推荐使用[postal.js](https://github.com/postaljs/postal.js "postal.js")这个库，简要示例如下：

    var Filter = React.createClass({
        _onChange: function() {
            var input = React.findDOMNode(this),
                value = input.value;

            //发布消息通知
            postal.publish({
                channel: "user",
                topic: "list.filter",
                data:{
                    value: value
                }
            });
        },
        render: function() {
            return <input type="text" ref="filterInput" onChange={this._onChange} placeholder="Filter" />;
        }
    });

    var List = React.createClass({
      getInitialState: function() {
        return {
          listItems: [
            'Chicago', 'New York', 'Tokyo', 'London',
            'San Francisco', 'Amsterdam', 'Hong Kong'
          ],
          nameFilter: ''
        };
      },
      componentDidMount: function(){
        var self = this;
        //监听消息通知
        postal.subscribe({
            channel: "user",
            topic: "list.filter",
            callback: function(data){
                self.setState({
                    nameFilter: data.value
                });
            }
        });
      },
      render: function() {
        var nameFilter = this.state.nameFilter.toLowerCase(),
            displayedItems = this.state.listItems.filter(function(it) {
                var match = it.toLowerCase().indexOf(nameFilter);
                return match !== -1;
            });

        var content;

        if (displayedItems.length) {
          var items = displayedItems.map(function(it) {
            return <li>{it}</li>;
          });
          content = <ul>{items}</ul>
        } else {
          content = <p>No items matching this filter</p>;
        }

        return (
          <div>
            <h4>Results</h4>
            {content}
          </div>
        );
      }
    });

    React.renderComponent(<Filter />, document.getElementById("user_filter"));
    React.renderComponent(<List />, document.getElementById("user_list"));

### 子组件与父组件之间的通讯
子组件与父组件之间的通讯，我们可以给子组件设置事件回调，简要示例如下：

    var Filters = React.createClass({
        _onChange: function() {
            var input = React.findDOMNode(this),
                value = input.value;

            if(this.props.onChange){
                this.props.onChange(value);
            }
        },
        render: function() {
            return <input type="text" ref="filterInput" onChange={this._onChange} placeholder="Filter" />;
        }
    });

    var List = React.createClass({
      getInitialState: function() {
        return {
          listItems: [
            'Chicago', 'New York', 'Tokyo', 'London',
            'San Francisco', 'Amsterdam', 'Hong Kong'
          ],
          nameFilter: ''
        };
      },
      _onFilter: function(filterValue) {
        this.setState({
          nameFilter: filterValue
        });
      },
      render: function() {
        var nameFilter = this.state.nameFilter.toLowerCase(),
            displayedItems = this.state.listItems.filter(function(it) {
                var match = it.toLowerCase().indexOf(nameFilter);
                return match !== -1;
            });

        var content;

        if (displayedItems.length) {
          var items = displayedItems.map(function(it) {
            return <li>{it}</li>;
          });
          content = <ul>{items}</ul>
        } else {
          content = <p>No items matching this filter</p>;
        }

        return (
          <div>
            <Filters onChange={this._onFilter} />
            <h4>Results</h4>
            {content}
          </div>
        );
      }
    });



### 有共同父组件的子组件之间的通讯
有共同父组件的子组件之间的通讯，我们可以给其中一个子组件设置回调，简要示例如下：

    var Filters = React.createClass({
      _onChange: function() {
        var value = this.refs.filterInput.getDOMNode().value;
        this.props.onChange(value);
      },
      render: function() {
        return <input type="text" ref="filterInput" onChange={this._onChange} placeholder="Filter" />;
      }
    });

    var List = React.createClass({
      render: function() {
        var content;
        if (this.props.items.length > 0) {
          var items = this.props.items.map(function(item) {
            return <li>{item}</li>;
          });
          content = <ul>{items}</ul>
        } else {
          content = <p>No items matching this filter</p>;
        }
        return (
          <div className="results">
            <h4>Results</h4>
            {content}
          </div>
        );
      }
    });

    var ListContainer = React.createClass({
      getInitialState: function() {
        return {
          listItems: ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'],
          nameFilter: ''
        };
      },
      _onFilter: function(filterValue) {
        this.setState({
          nameFilter: filterValue
        });
      },
      render: function() {
        var displayedItems = this.state.listItems.filter(function(item) {
          var match = item.toLowerCase().indexOf(this.state.nameFilter.toLowerCase());
          return (match !== -1);
        }.bind(this));

        return (
          <div>
            <Filters onChange={this._onFilter} />
            <List items={displayedItems} />
          </div>
        );
      }
    });

参考资料：
https://facebook.github.io/react/tips/communicate-between-components.html
http://stackoverflow.com/questions/21285923/reactjs-two-components-communicating