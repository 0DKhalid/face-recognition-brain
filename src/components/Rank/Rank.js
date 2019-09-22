import React from 'react';

class Rank extends React.Component {
  state = {
    emoji: ''
  };

  componentDidMount() {
    this.generateEmoji(this.props.rank);
  }

  componentDidUpdate(prevProps, PrevState) {
    if (
      prevProps.rank === this.props.rank &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.rank);
  }

  generateEmoji = entrise => {
    fetch(
      `https://tqy3c0epi2.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entrise}`
    )
      .then(data => data.json())
      .then(data => this.setState({ emoji: data.input }))
      .catch(console.log);
  };
  render() {
    return (
      <div>
        <div className='white f3'>{`${
          this.props.name
        }, Your current entry count is...`}</div>
        <div className='white f3'>{this.props.rank}</div>
        <div className='white f1'>{`Rank Badge: ${this.state.emoji}`}</div>
      </div>
    );
  }
}

export default Rank;
