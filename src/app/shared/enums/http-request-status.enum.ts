export enum HTTPRequestStatus {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
  pristine = "pristine" // Initial state. No requests done yet
}