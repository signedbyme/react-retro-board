import { connect } from 'react-redux';
import Button from './Button';
import { addBoard, addLaneToBoard, setActiveBoard } from '../actions/boards';
import { addLane } from '../actions/lanes';
import uuid from 'uuid';

const mapStateToButtonProps = (state, ownProps) => ({
	label: ownProps.label || 'button',
	className: ownProps.className || 'btn btn-primary'
});

const mapDispatchToButtonProps = (dispatch, ownProps) => ({
	onClick: () => {
		const boardId = uuid.v4();
		const lanes = ['Start', 'Stop', 'Continue'];

		dispatch(addBoard(boardId));

		lanes.forEach( (name) => {
			let laneId = uuid.v4();
			dispatch(addLane(laneId, name));
			dispatch(addLaneToBoard(laneId, boardId));
		});

		dispatch(setActiveBoard(boardId));
	}
});

const AddBoardButtonContainer = connect(
	mapStateToButtonProps,
	mapDispatchToButtonProps
)(Button);

export default AddBoardButtonContainer;
