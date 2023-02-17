type NoteOptions = Partial<{}>;

const defaultNoteOptions = {};

class Note {
  constructor(public pitch: string[], options: NoteOptions) {
    for (const key in defaultNoteOptions) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      } else this[key] = defaultNoteOptions[key];
    }
  }
}
