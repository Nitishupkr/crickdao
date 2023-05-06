import React, { useState, useEffect } from 'react';
import { ethers } from '../node_modules/ethers';
import { networks } from '../utils/network';
/// import polygon and eth logo directly by using ;
import polygonlogo from "../public/polygonlogo.png";
import ethlogo from "../public/ethlogo.png";
import styles from '../styles/Home.module.css';
import Image from 'next/image';


const ConnectWallet = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [network,setNetwork] = useState('') ;


    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask -> https://metamask.io/");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }


    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('Make sure you have metamask!');
            return;
        } else {
            console.log('We have the ethereum object', ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log('Found an authorized account:', account);
            setCurrentAccount(account);
        } else {
            console.log('No authorized account found');
        }

        // This is the new part, we check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

        ethereum.on('chainChanged', handleChainChanged);

        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
            window.location.reload();
        }

    };


    const switchNetwork = async () => {
        if (window.ethereum) {
            try {
                // Try to switch to the Mumbai testnet
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
                });
            } catch (error) {
                // This error code means that the chain we want has not been added to MetaMask
                // In this case we ask the user to add it to their MetaMask
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x13881',
                                    chainName: 'Polygon Mumbai Testnet',
                                    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                                    nativeCurrency: {
                                        name: "Mumbai Matic",
                                        symbol: "MATIC",
                                        decimals: 18
                                    },
                                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                                },
                            ],
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(error);
            }
        } else {
            // If window.ethereum is not found then MetaMask is not installed
            alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        }
    };

    // Render methods
    const renderNotConnectedContainer = () => (
        <div>
            {/* Call the connectWallet function we just wrote when the button is clicked */}
            <button onClick={connectWallet} className={styles.button}>
                Connect Wallet
            </button>
        </div>
    );

    // Render methods
    const renderConnectedContainer = () => (
        <div className={styles.button}>
            Connected
        </div>
    );


    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    return (
        <div>
            {/* This will hide the connect button if currentAccount isn't empty*/}
				{!currentAccount ? renderNotConnectedContainer() : renderConnectedContainer()}
        </div>
    )
}

export default ConnectWallet ; 