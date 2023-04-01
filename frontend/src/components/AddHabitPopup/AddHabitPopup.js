import React from "react";
import Popup from "../Popup/Popup";

export default function AddHabitPopup({isOpen, onClose, onAddHabitSubmit}) {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setDesc("");
    setKeyword("");
  }, [isOpen]);

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onDesc = (e) => {
    setDesc(e.target.value);
  };

  const onKeyword = (e) => {
    setKeyword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

  onAddHabitSubmit({
        title: title,
        desc: desc,
        keyword: keyword
    });
  }

  return (
    <Popup
      name="add"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          name="name"
          value={title}
          id="name"
          placeholder="Title"
          onChange={onTitle}
          required
          minLength="1"
          maxLength="30"
        />
        <span className="form__input-error title-error"></span>
        <input
          className="form__input"
          type="text"
          id="desc"
          placeholder="Description"
          name="desc"
          value={desc}
          onChange={onDesc}
          required
        />
        <span className="form__input-error desc-error"></span>
        <input
          className="form__input"
          type="text"
          id="keyword"
          placeholder="Keyword"
          name="keyword"
          value={keyword}
          onChange={onKeyword}
          required
        />
        <span className="form__input-error desc-error"></span>
      </fieldset>
    </Popup>
  );
}