const Label = ({ type, onClickFunction = null, children, active = false, clickable = false}) => {
  return (
    <>
      {/*<div className={"bg-venture-darkgray h-5 rounded-full px-3 py-0.5 mx-1"} onClick={onClickFunction} id={children} >*/}
      <div  className={`h-5 rounded-full px-3 py-0.5 mx-1 ${active && "active-label"}  ${clickable ? "clickable-label" : "default-label"}`} onClick={onClickFunction} id={children} >
        <p className={"text-xs text-venture-white"} id={children}>{children}</p>
      </div>
    </>
  );
};
// todo: highlight if active = true gets passed
export default Label;
