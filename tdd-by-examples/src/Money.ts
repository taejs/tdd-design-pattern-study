import Bank from "./Bank";
import Expression from "./Expression";

export class Sum extends Expression {
  public augend: Money;
  public addend: Money;

  constructor(augend:Money, addend:Money) {
    super();
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank:Bank, to: string): Money {
    return new Money(this.augend.amount + this.addend.amount, to);
  }
}

class Money extends Expression {
  amount: number = 0;
  protected _currency: string;

  constructor(amount: number, currency: string) {
    super();
    this.amount = amount;
    this._currency = currency;
  }

  reduce(bank:Bank, to: string): Money {
    const rate = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }

  equals(money: Object) {
    if(money instanceof Money) {
      return this.currency === money.currency &&
          this.amount === money.amount;
    }
    return false;
  }

  times(times:number): Money {
    return new Money(this.amount * times, this.currency);
  };

  plus(addend: Money): Sum {
    return new Sum(this, addend);
  }

  get currency() {
    return this._currency;
  }

  static dollar(amount: number):Money {
    return new Money(amount, 'USD');
  }

  static franc(amount: number):Money {
    return new Money(amount, 'CHF');
  }
}

export default Money;