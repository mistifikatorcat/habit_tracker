import React from "react";
import Popup from "../Popup/Popup";
import './editentitypopup.css';

export default function AddEntityPopup({isOpen, onClose, onEditHabitSubmit}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [keyword, setKeyword] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setDescription("");
    setKeyword("");
  }, [isOpen]);

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onDescription = (e) => {
    setDescription(e.target.value);
  };

  const onKeyword = (e) => {
    setKeyword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

  onAddHabitSubmit({
        title: title,
        description: description,
        keyword: keyword
    });
  }

  return (
    <Popup
      name="edit"
      title="Edit Habit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="text"
          name="title"
          value={title}
          id="title"
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
          id="description"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onDescription}
          required
        />
        <span className="form__input-error description-error"></span>
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
        <span className="form__input-error description-error"></span>
      </fieldset>
    </Popup>
  );
}