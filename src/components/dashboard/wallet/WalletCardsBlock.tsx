"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

type WalletCard = {
    id: string;
    name: string;
    type: string;
    cardNumber: string;
    bank: string;
    network: string;
    expiryMonth: number;
    expiryYear: number;
    color: string;
    isDefault: boolean;
};

type Props = {
    cards: WalletCard[];
};

function formatExpiry(month: number, year: number) {
    const mm = String(month).padStart(2, "0");
    const yy = String(year).slice(-2);
    return `${mm}/${yy}`;
}

function splitBank(bank: string) {
    const parts = String(bank || "").split("|").map((s) => s.trim());
    const brand = parts[0] || "Fintech.";
    const bankName = parts[1] || "Universal Bank";
    return { brand: brand.endsWith(".") ? brand : `${brand}.`, bankName };
}

export default function WalletCardsBlock({ cards }: Props) {
    const primaryCard = cards.find((c) => c.isDefault);
    if (!primaryCard) return null;

    const secondaryCard = cards.find((c) => !c.isDefault) ?? null;

    const primary = splitBank(primaryCard.bank);
    const secondary = secondaryCard ? splitBank(secondaryCard.bank) : null;

    return (
        <div
            style={{
                width: 354,
                height: 359,
                fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
            }}
        >

            <div
                style={{
                    width: 354,
                    height: 247,
                    borderRadius: 14,
                    padding: 1,
                    background:
                        "linear-gradient(114.49deg, rgba(255,255,255,0.4) -41.08%, rgba(255,255,255,0.1) 104.09%)",
                    boxSizing: "border-box",
                }}
            >

                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 14,
                        backgroundColor: "#FFFFFF",
                        position: "relative",
                        boxSizing: "border-box",
                    }}
                >

                    <div
                        style={{
                            width: 354,
                            height: 22,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                width: 55,
                                height: 22,
                                fontSize: 18,
                                fontWeight: 600,
                                lineHeight: "100%",
                                color: "#1B212D",
                            }}
                        >
                            Wallet
                        </div>

                        <div
                            style={{
                                width: 22,
                                height: 22,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MoreHorizontal size={22} color="#929EAE" />
                        </div>
                    </div>


                    <div
                        style={{
                            position: "absolute",
                            top: 37,
                            left: 0,
                            width: 354,
                            height: 210,
                            borderRadius: 15,
                            background:
                                "linear-gradient(104.3deg, #4A4A49 2.66%, #20201F 90.57%)",
                            overflow: "visible", 
                        }}
                    >

                        <div
                            style={{
                                position: "absolute",
                                top: 25,
                                left: 30,
                                width: 293,
                                height: 80,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                <div
                                    style={{
                                        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
                                        fontWeight: 400,
                                        fontSize: 16,
                                        lineHeight: "100%",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    {primary.brand}
                                </div>

                                <div
                                    style={{
                                        width: 1,
                                        height: 20,
                                        backgroundColor: "#626261",
                                    }}
                                />

                                <div
                                    style={{
                                        fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                        fontWeight: 500,
                                        fontSize: 12,
                                        lineHeight: "100%",
                                        color: "#626260",
                                    }}
                                >
                                    {primary.bankName}
                                </div>
                            </div>
                        </div>


                        <div
                            style={{
                                position: "absolute",
                                top: 70,
                                left: 30,
                                width: 38,
                                height: 30,
                            }}
                        >
                            <Image
                                src="/assets/Group.png"
                                alt="Chip"
                                width={38}
                                height={30}
                                className="object-contain"
                                priority
                            />
                        </div>


                        <div
                            style={{
                                position: "absolute",
                                top: 70,
                                left: 289,
                                width: 33,
                                height: 34,
                            }}
                        >
                            <Image
                                src="/assets/VectorCart.png"
                                alt="Contactless"
                                width={33}
                                height={34}
                                className="object-contain"
                                priority
                            />
                        </div>


                        <div
                            style={{
                                position: "absolute",
                                top: 130,
                                left: 30,
                                width: 238,
                                height: 24,
                                fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                fontWeight: 700,
                                fontSize: 17,
                                lineHeight: "100%",
                                letterSpacing: "10%",
                                color: "#FFFFFF",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {primaryCard.cardNumber}
                        </div>


                        <div
                            style={{
                                position: "absolute",
                                top: 188,
                                left: 30,
                                width: 49,
                                height: 20,
                                fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "100%",
                                letterSpacing: "2%",
                                color: "#868685",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {formatExpiry(primaryCard.expiryMonth, primaryCard.expiryYear)}
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                top: 160,
                                left: 282,
                                width: 47,
                                height: 36,
                            }}
                        >
                            <Image
                                src="/assets/International.png"
                                alt={primaryCard.network}
                                width={47}
                                height={36}
                                className="object-contain"
                            />
                        </div>


                        {secondaryCard && secondary && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 157,
                                    left: 15,
                                    width: 324,
                                    height: 172,
                                    borderRadius: 15,
                                    boxSizing: "border-box",

                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: 324,
                                        height: 172,
                                        borderRadius: 15,
                                        opacity: 0.1,
                                        background:
                                            "linear-gradient(131.66deg, #959595 -12.2%, #324000 147.88%)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: 324,
                                        height: 172,
                                        borderRadius: 15,
                                        background:
                                            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",

                                        borderImageSource:
                                            "linear-gradient(114.49deg, rgba(255, 255, 255, 0.4) -41.08%, rgba(255, 255, 255, 0.1) 104.09%)",
                                        borderImageSlice: 1,
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(10px)",
                                        overflow: "hidden",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 202,
                                            left: 35,
                                            width: 290,
                                            height: 68,
                                            transform: "translateY(-202px)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                left: 0,
                                                width: 183,
                                                height: 60,
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                                <div
                                                    style={{
                                                        fontFamily: "Kumbh Sans, ui-sans-serif, system-ui",
                                                        fontWeight: 400,
                                                        fontSize: 16,
                                                        lineHeight: "100%",
                                                        color: "#1B212D",
                                                    }}
                                                >
                                                    {secondary.brand}
                                                </div>

                                                <div
                                                    style={{
                                                        width: 1,
                                                        height: 20,
                                                        background: "#F5F5F5",
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                                        fontWeight: 500,
                                                        fontSize: 12,
                                                        lineHeight: "100%",
                                                        color: "#F5F5F5",
                                                    }}
                                                >
                                                    {secondary.bankName}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 250,
                                                left: 35,
                                                width: 30,
                                                height: 24,
                                                transform: "translate(-35px, -202px)",
                                            }}
                                        >
                                            <Image
                                                src="/assets/Group.png"
                                                alt="Chip"
                                                width={30}
                                                height={24}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 250,
                                                left: 280,
                                                width: 27,
                                                height: 20,
                                                transform: "translate(-35px, -202px) rotate(-0deg)",
                                            }}
                                        >
                                            <Image
                                                src="/assets/VectorCart.png"
                                                alt="Contactless"
                                                width={27}
                                                height={20}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 294,
                                            left: 35,
                                            width: 137,
                                            height: 45,
                                            transform: "translateY(-187px)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: 137,
                                                height: 23,
                                                fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                                fontWeight: 700,
                                                fontSize: 16,
                                                lineHeight: "100%",
                                                letterSpacing: "10%",
                                                color: "#1B212D",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {secondaryCard.cardNumber.replaceAll(" ", "")}
                                        </div>

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 28,
                                                left: 0,
                                                width: 41,
                                                height: 17,
                                                fontFamily: "Gordita, Kumbh Sans, ui-sans-serif, system-ui",
                                                fontWeight: 500,
                                                fontSize: 12,
                                                lineHeight: "100%",
                                                letterSpacing: "2%",
                                                color: "#929EAE",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {formatExpiry(secondaryCard.expiryMonth, secondaryCard.expiryYear)}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 313,
                                            left: 280,
                                            width: 32,
                                            height: 21,
                                            transform: "translateY(-187px)",
                                        }}
                                    >
                                        <Image
                                            src="/assets/visa.png"
                                            alt="Visa"
                                            width={32}
                                            height={21}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}
