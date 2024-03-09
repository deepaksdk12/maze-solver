import React from "react";
import "./topbar.css";

const TopBar = () => {
  return (
    <div className="top">
      <div className="topleft">
        <h4>Maze Solver</h4>
      </div>
      <div className="topcenter">
        <ul className="topList">
          <li className="topListItem">Tutorial</li>
          <li className="topListItem">Clear Maze</li>
          <li className="topListItem">Clear Path </li>
          <li className="topListItem">Generate Random Maze</li>
          <li className="topListItem">Visualize </li>
        </ul>
      </div>
      <div className="topleft">
        <div class="dropdown">
          <button class="dropbtn">Select an Algorithm</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#" id="BFS">
              Breadth-First-Search
            </a>
            <a href="#" id="DFS">
              Depth-First-Search
            </a>
            <a href="#" id="Bidirectional">
              Bidirectional Search
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
