class StackingValue:
    def __init__(self) -> None:

        self.FTT = {
            "name": "FTT",
            "unstaking": 14,
            "APY": {
                365: 14
            },
            "URL": "FTT/USD",
            "FutureURL": "FTT-PERP"
        }

        self.SRM = {
            "name": "SRM",
            "unstaking": 7,
            "APY": {
                365: 4
            },
            "URL": "SRM/USD",
            "FutureURL": "SRM-PERP"
        }

        self.SOL = {
            "name": "SOL",
            "unstaking": 7,
            "APY": {
                365: 6
            },
            "URL": "SOL/USD",
            "FutureURL": "SOL-PERP"
        }

        self.RAY = {
            "name": "RAY",
            "unstaking": 7,
            "APY": {
                365: 20
            },
            "URL": "RAY/USD",
            "FutureURL": "RAY-PERP"
        }

    def getAllUrlMarkets(self) -> list:
        return [*map(lambda x: x[1]['URL'], list(vars(self).items()))]

    def getAllUrlFuture(self) -> list:
        return [*map(lambda x: x[1]['FutureURL'], list(vars(self).items()))]

    def getAllAPY(self) -> list:
        return [*map(lambda x: x[1]["APY"][365], list(vars(self).items()))]

    def getAllName(self) -> list:
        return [*map(lambda x: x[1]["name"], list(vars(self).items()))]



StakeToken = StackingValue()
