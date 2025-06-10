var Employee = /** @class */ (function () {
    function Employee(_empName, _age, _empJob) {
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
    }
    Object.defineProperty(Employee.prototype, "empName", {
        // get/set
        get: function () {
            return this.empName;
        },
        set: function (val) {
            this._empName = val;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.printEmp = function () {
        console.log("".concat(this._empName, "\uC758 \uB098\uC774\uB294 ").concat(this._age, "\uC774\uACE0, \uC9C1\uC5C5\uC740 ").concat(this._empJob, "\uC785\uB2C8\uB2E4."));
    };
    return Employee;
}());
var employee = new Employee("김이박", 30, "개발자");
// employee.empName = "최이박";
employee.printEmp();
