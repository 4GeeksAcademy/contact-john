export const Cards = (props) => {
    return (
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://picsum.photos/id/237/200/300" className="img-fluid rounded-start" alt="imagen"/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.number}</p>
        <p className="card-text">{props.email}</p>
        <p className="card-text">{props.address}</p>
      </div>
    </div>
  </div>
</div>);
};  