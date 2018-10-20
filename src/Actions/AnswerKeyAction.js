import { connect } from 'react-redux';

import * as Actions from './ActionTypes';
import AnswerKeyComponent from '../Components/AnswerKeyComponent';

const mapStateToProps = (state) => ({
    answerKey: state.answerKeyReducer.answerKey
});

const mapDispatchToProps = (dispatch) => ({
    showAnswerKey: () => dispatch({type: Actions.SHOW_ANSWER_KEY}),
    hideAnswerKey: () => dispatch({type: Actions.HIDE_ANSWER_KEY}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerKeyComponent);
