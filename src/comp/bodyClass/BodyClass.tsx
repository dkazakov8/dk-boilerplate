import { ConnectedComponent } from 'compSystem/ConnectedComponent';

type PropsBodyClass = {
  isActive: boolean;
  className: string;
};

export class BodyClass extends ConnectedComponent<PropsBodyClass> {
  UNSAFE_componentWillMount() {
    this.handleUpdateBodyClass();
  }

  componentDidUpdate() {
    this.handleUpdateBodyClass();
  }

  componentWillUnmount() {
    if (!IS_CLIENT) return;

    const { className } = this.props;

    document.body.classList.remove(className);
  }

  handleUpdateBodyClass = () => {
    if (!IS_CLIENT) return;

    const { isActive, className } = this.props;

    if (isActive) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  };

  render() {
    return null;
  }
}
