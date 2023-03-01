import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from "react";   //inportしないとuseState使えない
import dummyData from "../dummyData";
import Card from './Card';

const Main = () => {
  const [data, setData] = useState(dummyData);
  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    // const addItem = id => {

    // }

    //カードを削除したい
  //   const deleteItem = (data, index) => {
  //     const result = data.findIndex;
  //     result.splice(index,1);
  //     return result;
  //  };

    //別のカラムにタスクが移動した時
    if (source.droppableId !== destination.droppableId) {
    //同じカラム内でのタスクの入れ換え
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);
    console.log(sourceColIndex);
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];
    const sourceTask = [...sourceCol.tasks];
    const destinationTask = [...destinationCol.tasks];  //コピーしたものを変更する。元の配列のデータは変更せずにすむ
    //動かし始めたタスクを削除する
    const [removed] = sourceTask.splice(source.index, 1);
    //動かした後のカラムにタスクを追加
    destinationTask.splice(destination.index, 0, removed);
    data[sourceColIndex].tasks = sourceTask;
    data[destinationColIndex].tasks = destinationTask;
    setData(data);
    } else {
    //同じカラム内でのタスクの入れ換え
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    console.log(sourceColIndex);
    const sourceCol = data[sourceColIndex];
    console.log(sourceCol); //これでカラム内にあるカードの中身が全部受け取れる

    const sourceTask = [...sourceCol.tasks];  //コピーしたものを変更する。元の配列のデータは変更せずにすむ
    //タスクを削除して、移動先に削除したタスクを挿入する
    const [removed] = sourceTask.splice(source.index, 1);
    //spliceは二つの引数だと削除して、三つの引数だと追加する
    sourceTask.splice(destination.index, 0, removed);

    data[sourceColIndex].tasks = sourceTask;  //入れ換え済みのsourceTaskを元の配列に挿入する
    setData(data);
    }
    // 消すボタン処理？ 
    // const deleteItemTask = (data, index) => {
    //   const removed = deleteItem(source, index);
    //   setData(data, removed);
    // }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="trello">
          {data.map(section => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                // ↓ややこしいけどつけないとDrag&Dropができない
                <div 
                className="trello-section" 
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                  {/* classNameはCSSに合わせる */}
                  <div className="trello-section-title">{section.title}</div>
                  <div className="trello-section-content">
                    {section.tasks.map((task, index) => (
                      <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                      // onAddItem={addItem}     //追加するボタン
                      // onDeleteItem={deleteItemTask}   //消すボタン
                      >
                        {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            // ドラッグしているときに半透明にする
                            opacity: snapshot.isDragging ? "0.3" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                          {/* どうにかして消すボタンを作りたい */}
                          {/* <button className="Delete-item-btn" onClick={() => onDeleteItem(task.id, index)}></button> */}
                        </div>
                      )}
                      </Draggable>
                    ))}
                    {/* ↓自動的に背景がカードに合わせて動いてくれる */}
                    {provided.placeholder}
                    {/* 追加したい */}
                    {/* <button className="Add-item-btn" onClick={() => onAddItem(task.id)}></button> */}
                  </div>
                </div>
              )}
            </Droppable>
          ))}

        </div>
    </DragDropContext>
  );
};

export default Main;