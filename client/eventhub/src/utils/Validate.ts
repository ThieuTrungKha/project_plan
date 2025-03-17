export class Validate {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    return regex.test(val);
  };
}
