const Detail = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="py-2">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );
};

export default Detail;
