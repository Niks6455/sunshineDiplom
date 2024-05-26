export default class ProfileDto {
    id;
    name;
    surname;
    patronymic;
    login;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        this.login = model.login;
    }
}