import React from 'react';
import { Manager } from '@twilio/flex-ui';
import { MessageList } from '@twilio/flex-ui';

class LatestCustomerMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latestMessage: null
    };
  }

  componentDidMount() {
    this.messageListListener = Manager.getInstance().chatClient.channel
      .getChannel(this.props.channelSid)
      .then(channel => {
        channel.on('messageAdded', this.handleNewMessage);
      });
  }

  componentWillUnmount() {
    if (this.messageListListener) {
      this.messageListListener.then(channel => {
        channel.off('messageAdded', this.handleNewMessage);
      });
    }
  }

  handleNewMessage = message => {
    if (message.author === 'customer') {
      this.setState({
        latestMessage: message.body
      });
    }
  };

  render() {
    return (
      <div>
        <p>Latest Customer Message:</p>
        <p>{this.state.latestMessage}</p>
        <MessageList channelSid={this.props.channelSid} />
      </div>
    );
  }
}

export default LatestCustomerMessage;
