Template.OrganizationSettings_StandardsType.viewmodel({
  isChanged() {
    const tplData = this.templateInstance.data;
    const storedName = tplData.name;
    const storedAbbr = tplData.abbreviation;

    const name = this.name();
    const abbreviation = this.abbreviation();

    return _.every([
      name && abbreviation,
      (name !== storedName) || (abbreviation !== storedAbbr)
    ]);
  },
  onFocusOut() {
    if (this.isChanged()) {
      this.onChange(this);
    }
  },
  delete() {
    this.onDelete(this);
  },
  getData() {
    return {
      name: this.name(),
      abbreviation: this.abbreviation()
    };
  }
});