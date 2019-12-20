export const get = async () => {
  const get = await fetch(`/note/`);
  const data = await get.json();
  return data.notes;
};

export const add = async (note, position) => {
  const options = {
    method: "PUT",
    body: JSON.stringify({ text: note, position: position }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`/note/`, options);
};

export const remove = async noteId => {
  const options = {
    method: "DELETE",
    body: JSON.stringify({ id: noteId }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`/note/`, options);
};

export const toggle = async noteId => {
  const options = {
    method: "PATCH",
    body: JSON.stringify({ id: noteId }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`/note/`, options);
};

export const move = async (noteId, destination) => {
  const options = {
    method: "PATCH",
    body: JSON.stringify({ id: noteId, position: destination }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(`/note/`, options);
};
