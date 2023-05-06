import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  CricDAONFT_CONTRACT_ADDRESS,
  CricDAONFT_ABI,
} from "../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { ethers, utils } from "ethers";

/// contract that allow transfers of NFT from one DAO user to another, users can put up the NFT on Sale and it will be shown to them
/// Not for Now but will be used later when we allow them to trade the cards
