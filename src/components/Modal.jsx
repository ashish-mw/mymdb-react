function Modal(props) {
  const { type, message, onClick } = props;
  return (
    <dialog open>
      <article>
        <h3>{type}</h3>
        <p>{message}</p>
        <footer>
          <button onClick={onClick}>Close</button>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;
