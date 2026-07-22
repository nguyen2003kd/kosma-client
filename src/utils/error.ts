// Core
import { isAxiosError } from "axios";
// import type { ApiResponse } from '@/api/models/apiResponse'

// Extract a human readable message from an API error or exception.
export const extractErrorMessage = (error: unknown): string => {
  // console.log('API Error Response Data:', error)

  // Handle Axios errors
  if (isAxiosError(error)) {
    const responseData = error.response?.data;
    if (responseData) {
      // Handle the specific error format you showed
      if (
        responseData.data?.violations &&
        Array.isArray(responseData.data.violations)
      ) {
        const violations = responseData.data.violations;
        if (violations.length > 0) {
          const violation = violations[0];

          // Check if violation has action.errors with field-specific messages
          if (
            violation.action?.errors &&
            Array.isArray(violation.action.errors)
          ) {
            const errors = violation.action.errors;
            if (errors.length > 0) {
              const firstError = errors[0];
              if (firstError.message?.vi) {
                return firstError.message.vi;
              }
              if (firstError.message?.en) {
                return firstError.message.en;
              }
            }
          }

          // Fallback to violation message
          if (violation.message) {
            return violation.message;
          }
        }
      }

      // Handle direct data structure
      if (responseData.data?.message) {
        return responseData.data.message;
      }
      if (responseData.data?.message_en) {
        return responseData.data.message_en;
      }

      // Handle direct response message
      if (responseData.message) {
        return responseData.message;
      }
      if (responseData.message_en) {
        return responseData.message_en;
      }
    }

    // Fallback to axios error message
    return error.message || "Có lỗi xảy ra, vui lòng thử lại sau";
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle direct error objects with our API format
  if (error && typeof error === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorObj = error as Record<string, any>;
    if (errorObj.data?.violations && Array.isArray(errorObj.data.violations)) {
      const violations = errorObj.data.violations;
      if (violations.length > 0) {
        const violation = violations[0];
        if (
          violation.action?.errors &&
          Array.isArray(violation.action.errors)
        ) {
          const errors = violation.action.errors;
          if (errors.length > 0) {
            const firstError = errors[0];
            if (firstError.message?.vi) {
              return firstError.message.vi;
            }
            if (firstError.message?.en) {
              return firstError.message.en;
            }
          }
        }
        if (violation.message) {
          return violation.message;
        }
      }
    }

    if (errorObj.data?.message) return errorObj.data.message;
    if (errorObj.data?.message_en) return errorObj.data.message_en;
    if (errorObj.message) return errorObj.message;
    if (errorObj.message_en) return errorObj.message_en;
  }

  return "Có lỗi xảy ra, vui lòng thử lại sau";
};
