import { useReducer } from 'react';
import Controls from 'components/Controls/Controls';
import Statistics from 'components/Statistics/Statistic';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'addgood':
      return { ...state, good: state.good + payload };
    case 'addneutral':
      return { ...state, neutral: state.neutral + payload };
    case 'addbad':
      return { ...state, bad: state.bad + payload };
    default:
      throw new Error();
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = state;
    if (total !== 0) {
      return +((good / total) * 100).toFixed(2);
    }
    return 0;
  };

  const onLeaveFeedBack = state => {
    dispatch({ type: `add${state}`, payload: 1 });
  };

  const options = Object.keys(state);
  const total = countTotalFeedback();
  const PositiveFeedbackPercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title={'Please leave feedback'}>
        <Controls options={options} onLeaveFeedBack={onLeaveFeedBack} />
      </Section>
      <Section title={'Statistics'}>
        {total > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={total}
            positivePercentage={PositiveFeedbackPercentage}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </>
  );
}

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const total = this.countTotalFeedback();
//     const { good } = this.state;
//     if (total !== 0) {
//       return +((good / total) * 100).toFixed(2);
//     }
//     return 0;
//   };

//   onLeaveFeedBack = state => {
//     this.setState(prevState => ({
//       [state]: prevState[state] + 1,
//     }));
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const options = Object.keys(this.state);
//     const total = this.countTotalFeedback();
//     const PositiveFeedbackPercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <>
//         <Section title={'Please leave feedback'}>
//           <Controls options={options} onLeaveFeedBack={this.onLeaveFeedBack} />
//         </Section>
//         <Section title={'Statistics'}>
//           {total > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={PositiveFeedbackPercentage}
//             />
//           ) : (
//             <Notification message={'There is no feedback'} />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
