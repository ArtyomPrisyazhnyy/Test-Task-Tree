import React, {FC, useState} from 'react'
import { renameTreeNode } from '../http/treeAPI';

interface TaskCreateNode {
    show: boolean;
    onHide: (data: boolean) => void;
    id: string;
    oldName: string,
    onUpdateData: () =>  void;
}

const RenameNode: FC<TaskCreateNode> = ({show, onHide, id, oldName, onUpdateData}: TaskCreateNode) => {
    const [value, setValue] = useState(oldName);

    const renameNode = async () => {
        await renameTreeNode(id, value).then(data => {
            setValue('');
            onHide(false);
        })
        onUpdateData()
    }
    return (
        <>
            {show &&
                  <div 
                    className="modal"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                  >
                  <div className="modal__content">
                      <div className="modal__title">rename Node</div>
                      <form action="/" method="post">
                          <input
                              className="form__cont"
                              type="text"
                              placeholder="type Node"
                              value={value}
                              onChange={e => setValue(e.target.value)}></input>
                      </form>

                      <div className="modal__buttons">
                          <div className="modal__btn modal__add"
                              onClick={() => onHide(false)}>
                              close
                          </div>
                          <div className="modal__btn modal__close"
                              onClick={renameNode}>rename</div>
                      </div>
                  </div>
              </div>   
            }
        </>
    )
}

export default RenameNode