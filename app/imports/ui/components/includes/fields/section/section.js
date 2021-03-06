import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

Template.SectionField.viewmodel({
  mixin: ['search', 'modal', 'organization', 'collapsing'],
  onCreated() {
    const items = this.items();

    if (!this.sectionId() && items.count() > 0) {
      const { _id, title } = items.fetch()[0];

      this.sectionId(_id);
      this.section(title);
    } else if (!!this.sectionId() && items.count() > 0) {
      const find = items.fetch().filter(item => item._id === this.sectionId());
      const item = find.length > 0 && find[0];
      this.section(item.title);
    }
  },
  section: '',
  sectionId: '',
  sectionHintText() {
    return !!this.section() ? `Add "${this.section()}" section` : 'Start typing...';
  },
  select({ _id, title }) {
    this.section(title);
    this.sectionId(_id);
    this.update();
  },
  addNewSection() {
    if (!this.section()) return;

    this.showAlert();
  },
  showAlert() {
    swal(
      {
        title: "Are you sure?",
        text: `New section "${this.section()}" will be added.`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Add",
        closeOnConfirm: false
      },
      () => {
        this.onAlertConfirm();
      }
    );
  },
  onAlertConfirm() {
    const cb = (err, _id) => {
      if (err) {
        swal('Oops... Something went wrong!', err.reason, 'error');
      } else {
        swal("Added!", `Section "${this.section()}" was added successfully.`, "success");

        this.sectionId(_id);

        this.update();
      }
    };

    this.onAddSection(this, cb);
  },
  update() {
    const _id = this.sectionId();

    this.fixSection();

    if (_id === this.templateInstance.data.sectionId) return;

    this.onUpdate(this);
  },
  fixSection() {
    if (!!this.sectionId() && !this.section()) {
      const find = this.items().fetch().filter(doc => doc._id === this.sectionId());
      const item = !!find.length > 0 && find[0];
      !!item && this.section(item.title);
    }
  },
  getData() {
    const { section, sectionId } = this.data();
    return { section, sectionId };
  },
  events: {
    'focus input'() {
      this.section('');
    }
  }
});
