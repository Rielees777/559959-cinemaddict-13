
export const COMMONCONST = {
  emodjiList: [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ]
};

export const emodjIcon = (data) => {
  const imgage = document.createElement(`img`);
  imgage.src = `./images/emoji/${data}.png`;
  imgage.width = 55;
  imgage.height = 55;
  imgage.alt = `emoji-${data}`;
  return imgage;
};
