import { pad } from "../logic/helpers";

class DateOnly {
  public static readonly ValuesSeparator: string = '-';

  private _date: Date;

  public constructor(date: DateOnly | Date | string = new Date()) {
    if (date instanceof Date) {
      this._date = date;
    } else if (date instanceof DateOnly) {
      this._date = date.date;
    } else {
      this._date = new Date(date);
    }
  }

  public static parse(dateOnlyStr: string): DateOnly {
    return new DateOnly(dateOnlyStr);
  }

  public static today(): DateOnly {
    return new DateOnly(new Date());
  }

  public get date(): Date {
    return this._date;
  }

  public set date(date: Date) {
    this._date = date;
  }

  public addDays(count: number): DateOnly {
    const newDateDays: number = this._date.getDate() + count;
    const newDate: Date = new Date(this._date);
    newDate.setDate(newDateDays);

    return new DateOnly(newDate);
  }

  toString(yearFirst: boolean = true, separator: string = DateOnly.ValuesSeparator): string {
    const year = this._date.getFullYear();
    const month = this._date.getMonth() + 1;
    const day = this._date.getDate();

    return yearFirst
      ? `${pad(year, 4)}${separator}${pad(month, 2)}${separator}${pad(day, 2)}`
      : `${pad(day, 2)}${separator}${pad(month, 2)}${separator}${pad(year, 4)}`;
  }
}

export default DateOnly;