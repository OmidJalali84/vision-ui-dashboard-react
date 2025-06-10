import { formatEther, parseEther, encodePacked, keccak256, etherUnits } from "viem";
import { contractAddress, usdtAddress, contractABI, pointAddress } from "./helper";
import { useReadContract } from "wagmi";
import { readContract, writeContract } from "wagmi/actions";
import { config } from "./Web3Provider";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

export function getUser(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getUser",
    args: [address],
  });
}

export function getUserByUsername(username) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getUserByUsername",
    args: [username],
  });
}

export function registerUser(userAddress, referrer, amount, username, forToken) {
  console.log(userAddress, referrer, amount, username, forToken);
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "register",
    args: [userAddress, referrer, ethers.utils.parseEther(amount.toString()), username, forToken],
  });
}

export function getStackerInfo(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "stakerInfo",
    args: [address],
  });
}

export function getContractStage() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getContractStage",
    args: [],
  });
}

export function getTokenBalance(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address],
  });
}
export function getLockedBalance(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "lockedAmount",
    args: [address],
  });
}

export function getPointBalance(address) {
  return useReadContract({
    abi: contractABI,
    address: pointAddress,
    functionName: "balanceOf",
    args: [address],
  });
}

export function getStakes(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getUserStakes",
    args: [address],
  });
}

export function getAvailableRewards(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "availableRewards",
    args: [address],
  });
}

export function approveUsdt(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: usdtAddress,
    functionName: "approve",
    args: [contractAddress, ethers.utils.parseUnits(amount.toString(), 18)],
  });
}

export function stakeMore(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "stakeMore",
    args: [ethers.utils.parseUnits(amount.toString(), 18)],
  });
}

export function upgrade(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "upgradePlan",
    args: [ethers.utils.parseUnits(amount.toString(), 18), true],
  });
}

export function claimRewards() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "claimRewards",
    args: [],
  });
}
