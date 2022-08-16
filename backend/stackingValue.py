class StackingValue:
    def __init__(self) -> None:

        self.FTT = {
            "name": "FTT",
            "unstaking": 14,
            "APY": {
                365: 14
            },
            "URL": "FTT/USD",
            "FutureURL": "FTT-PERP",
            "imageUrl": "https://ftx.com/static/media/ftt-staking-banner.a6546d0d.png"
        }

        self.SRM = {
            "name": "SRM",
            "unstaking": 7,
            "APY": {
                365: 4
            },
            "URL": "SRM/USD",
            "FutureURL": "SRM-PERP",
            "imageUrl": "https://ftx.com/static/media/serum-listing-banner-4.76a688af.png"
        }

        self.SOL = {
            "name": "SOL",
            "unstaking": 7,
            "APY": {
                365: 6
            },
            "URL": "SOL/USD",
            "FutureURL": "SOL-PERP",
            "imageUrl": "https://ftx.com/static/media/solana.8c9c96d2.svg"

        }

        self.RAY = {
            "name": "RAY",
            "unstaking": 7,
            "APY": {
                365: 20
            },
            "URL": "RAY/USD",
            "FutureURL": "RAY-PERP",
            "imageUrl": "https://ftx.com/static/media/ray.3ab64276.svg"

        }

    def getAllUrlMarkets(self) -> list:
        return [*map(lambda x: x[1]['URL'], list(vars(self).items()))]

    def getAllUrlFuture(self) -> list:
        return [*map(lambda x: x[1]['FutureURL'], list(vars(self).items()))]

    def getAllAPY(self) -> list:
        return [*map(lambda x: x[1]["APY"][365], list(vars(self).items()))]

    def getAllName(self) -> list:
        return [*map(lambda x: x[1]["name"], list(vars(self).items()))]

    def getAllImageUrl(self) -> list:
        return [*map(lambda x: x[1]["imageUrl"], list(vars(self).items()))]



StakeToken = StackingValue()
