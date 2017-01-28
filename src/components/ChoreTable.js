// TODO: Add completedBy property to chores and action to add users

import React, { Component } from 'react';

export default function ChoreTable(props) {

  const choreList = props.chores;
  const userList = props.users;

  const rows = choreList.map((chore, i) => {
    // create list of who completed each chore

    const completedBy = chore.completedBy.map(user => {
      return (
        <div key={user} className="token">{user}</div>
      )
    });


    return (
      <div
        key={i + '_' + chore.title}
        className="chore-row"
      >
        <div className="chore-complete-container">
          <button
            onClick={props.handleCompleteChore}
            value={chore.title}
          >
            Complete
          </button>
        </div>
        <div className="chore-title">
          {chore.title}
        </div>

        <div>
          {completedBy}

        </div>
      </div>
    );
  });

  return (
    <div className="chore-table">

          {rows}
    </div>
  )
}
