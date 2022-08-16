from re import M
import requests
from stackingValue import StakeToken
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
        self.riskPercentage: float = (self.risk * 100 / PriceCurrencies) - 100


class Parsing:

    def __init__(self, MyMoney=1) -> None:
        self.MyMoney = MyMoney
        self.allElement: list = []
        self.name: list = StakeToken.getAllName()
        self.priceElemPrev: list = [0, 0, 0, 0]
        self.priceElem: list = list(map(lambda item: float(
            item['result']['price']), PriceMarkets.Markets()))
        self.price24Change: list = list(map(lambda item: float(
            item['result']['change24h']), PriceMarkets.Markets()))
        self.StakeTokenElem: list = list(map(int, StakeToken.getAllAPY()))

    def calculPorcent(self) -> list:
        i: int = 0
        calcul: list = []
        percentage: list = []
        for elem in self.priceElem:
            calcul.append(elem + self.price24Change[i])
            percentage.append(
                (calcul[i] * 100 / self.priceElem[i]) - 100)
            i += 1
        return percentage

    def calculateFormulaProfit(self):
        percentage: list = self.calculPorcent()
        for i in range(len(self.priceElem)):
            F = Formule(
                self.MyMoney, self.priceElem[i], self.StakeTokenElem[i])
            self.allElement += [{
                "name": self.name[i],
                "priceElem": self.priceElem[i],
                "stakeTokenElem": self.StakeTokenElem[i],
                "startCoin": F.startCoin,
                "coinsFinal": F.coinsFinal,
                "moneyFinal": F.moneyFinal,
                "risk": F.risk,
                "riskPourcent": F.riskPercentage,
                "percentage": percentage[i],
                "imageUrl": StakeToken.getAllImageUrl()[i]
            }]
        self.allElement = json.dumps(self.allElement)
