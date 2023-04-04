//import "./App.module.css";

function NFTs({ _name, _description, _img }) {
  const name = "NFT1";
  const description = "NFT description";
  const img =
    "https://books.google.kz/books/publisher/content?id=QZ_9DwAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U1UQsAyjVgRD6NPISqcQVDwGk7IPw&w=1280";

  return (
    <div className="NFTCard">
      <img className="image" src={img} />
      <div className="description">
        <h4>
          <b>{name}</b>
        </h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default NFTs;
