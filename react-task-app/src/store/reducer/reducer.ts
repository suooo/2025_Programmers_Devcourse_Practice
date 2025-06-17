import { boardsReducer } from "../slices/boardsSlice";
import { loggerReducer } from "../slices/loggerSlice";
import { modalReducer } from "../slices/modalSlice";

// 서브 리듀서들을 하나로 묶어두기
const reducer = {
  logger: loggerReducer,
  boards: boardsReducer,
  modal: modalReducer,
};

export default reducer;
