type WindowWithNtm = Window & {
  Ntm: {
    Event: {
      fireUserDefined: (event: string, data: Record<string, any>) => void;
    };
  };
};

declare const window: WindowWithNtm;

export const wcSearchBooks = (bookTitle: string) => {
  if (typeof window.Ntm !== "undefined") {
    console.log("wc fireUserDefined");
    window.Ntm.Event.fireUserDefined("searchBook", { bookTitle: bookTitle });
  } else {
    console.log({
      event: "searchBooks",
      bookTitle: bookTitle,
    });
  }
};
