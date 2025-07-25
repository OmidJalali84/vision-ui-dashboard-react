import { formatEther, parseEther, encodePacked, keccak256, etherUnits, zeroAddress } from "viem";
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

export function getDaiBalance(address) {
  return useReadContract({
    abi: contractABI,
    address: usdtAddress,
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

export function getUnlockedBalance(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "unlockedAmount",
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
    args: [contractAddress, ethers.utils.parseUnits(amount.toString(), 6)],
  });
}

export function approveUnity(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "approve",
    args: [contractAddress, ethers.utils.parseUnits(amount.toString(), 6)],
  });
}

export function stakeMore(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "stakeMore",
    args: [ethers.utils.parseUnits(amount.toString(), 6)],
  });
}

export function stake(userAddress, amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "register",
    args: [userAddress, zeroAddress, ethers.utils.parseUnits(amount.toString(), 6), "", 2],
  });
}

export function register(userAddress, amount, plan) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "register",
    args: [userAddress, zeroAddress, ethers.utils.parseUnits(amount.toString(), 6), "", plan],
  });
}

export function upgrade(amount, plan) {
  console.log(amount);
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "upgradePlan",
    args: [ethers.utils.parseUnits(amount.toString(), 6), plan],
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

export function claimIsOpen() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "claimOpen",
    args: [],
  });
}

export function isPaused() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "paused",
    args: [],
  });
}

export function swapIsOpen() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "swapOpenForAll",
    args: [],
  });
}

export function openClaim() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "openClaim",
    args: [],
  });
}

export function closeClaim() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "closeClaim",
    args: [],
  });
}

export function pause() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "pauseStake",
    args: [],
  });
}

export function unpause() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "unpauseStake",
    args: [],
  });
}

export function openSwap() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "openSwap",
    args: [],
  });
}

export function totalAvailableRewards() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "totalAvailableRewards",
    args: [],
  });
}

export function getPrice() {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "price",
    args: [],
  });
}

export function swap(adress, unityToDai, amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "swap",
    args: [adress, unityToDai, amount],
  });
}

export function changeLevel1(amount) {
  console.log(amount);
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "changeLevel1Entrance",
    args: [ethers.utils.parseUnits(amount.toString(), 6)],
  });
}

export function changeLevel1Stake(amount) {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "changeLevel1EntranceStake",
    args: [ethers.utils.parseUnits(amount.toString(), 6)],
  });
}

export function getUserTeam(address) {
  return useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "sumDownlineByPlan",
    args: [address],
  });
}

export function withdrawToken() {
  return writeContract(config, {
    abi: contractABI,
    address: contractAddress,
    functionName: "withdrawUnity",
    args: [],
  });
}
