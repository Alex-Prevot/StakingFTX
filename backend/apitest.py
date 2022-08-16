import requests
from stackingValue import StakeToken
from app import amount
import json

class PriceMarkets:

    @staticmethod
    def Markets() -> list:
        ActualStatues: list[dict] = []
        for url in StakeToken.getAllUrlMarkets():
            response = requests.get("https://ftx.com/api/markets/" + url)
            if response.status_code != 200:
                ActualStatues.append({url: "Error"})
            else:
                ActualStatues.append(response.json())
        return ActualStatues


class PriceFuture:

    @staticmethod
    def Future() -> list:
        FutureStatues: list[dict] = []
        for FutureUrl in StakeToken.getAllUrlFuture():
            response = requests.get("https://ftx.com/api/futures/" + FutureUrl)
            if response.status_code != 200:
                FutureStatues.append({FutureUrl: "Error"})
            else:
                FutureStatues.append(response.json())
        return FutureStatues


class Formule:

    def __init__(self, MyMoney, PriceCurrencies, StackingCurrencies) -> None:
        self.startCoin: float = (MyMoney / PriceCurrencies)
        self.coinsFinal: float = (
            (MyMoney / PriceCurrencies) * StackingCurrencies / 100) + (MyMoney / PriceCurrencies)
        self.moneyFinal: float = (StackingCurrencies * MyMoney / 100) + MyMoney
        self.risk: float = MyMoney / self.coinsFinal


class Parsing:

    def __init__(self, MyMoney = 1) -> None:
        self.MyMoney = MyMoney
        self.allElement: list = []
        self.name: list = StakeToken.getAllName()
        self.priceElem: list = list(map(lambda item: float(
            item['result']['price']), PriceMarkets.Markets()))
        self.StakeTokenElem: list = list(map(int, StakeToken.getAllAPY()))

    def calculateFormulaProfit(self):
        for i in range(len(self.priceElem)):
            F = Formule(self.MyMoney, self.priceElem[i], self.StakeTokenElem[i])
            self.allElement += [{
                "name": self.name[i],
                "priceElem": self.priceElem[i],
                "stakeTokenElem": self.StakeTokenElem[i],
                "startCoin": F.startCoin,
                "coinsFinal": F.coinsFinal,
                "moneyFinal": F.moneyFinal,
                "risk": F.risk
            }]
        self.allElement = json.dumps(self.allElement)


a = Parsing()
a.calculateFormulaProfit()
print(a.allElement)
