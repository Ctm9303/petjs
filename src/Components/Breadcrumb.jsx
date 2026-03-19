import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ current, parent = "Trang chủ", parentTo = "/" }) {
  return (
    <div className="wc-breadcrumb">
      <div className="wc-breadcrumb-inner">
        <Link to={parentTo}>{parent}</Link>
        <span className="wc-breadcrumb-sep">|</span>
        <span className="wc-breadcrumb-current">{current}</span>
      </div>
    </div>
  );
}

