import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse bg-muted rounded ${className}`}></div>
  );
}

export function HomeScreenSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
      <div className="px-6 pt-6 pb-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="space-y-2">
            <LoadingSkeleton className="h-8 w-48" />
            <LoadingSkeleton className="h-4 w-32" />
          </div>
          
          {/* Main card skeleton */}
          <div className="p-6 bg-background rounded-2xl shadow-card space-y-4">
            <div className="flex justify-between">
              <LoadingSkeleton className="h-5 w-32" />
              <LoadingSkeleton className="h-4 w-16" />
            </div>
            <div className="text-center space-y-2">
              <LoadingSkeleton className="h-12 w-24 mx-auto" />
              <LoadingSkeleton className="h-6 w-32 mx-auto" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center space-y-1">
                <LoadingSkeleton className="h-4 w-16 mx-auto" />
                <LoadingSkeleton className="h-5 w-12 mx-auto" />
              </div>
              <div className="text-center space-y-1">
                <LoadingSkeleton className="h-4 w-20 mx-auto" />
                <LoadingSkeleton className="h-5 w-12 mx-auto" />
              </div>
            </div>
          </div>
          
          {/* Action button skeleton */}
          <LoadingSkeleton className="h-12 w-full" />
          
          {/* Sectors skeleton */}
          <div className="space-y-4">
            <LoadingSkeleton className="h-6 w-32" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-background rounded-xl shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LoadingSkeleton className="w-8 h-8 rounded-full" />
                      <div className="space-y-1">
                        <LoadingSkeleton className="h-4 w-32" />
                        <LoadingSkeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <LoadingSkeleton className="h-4 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TripSummarySkeleton() {
  return (
    <div className="min-h-screen bg-gradient-surface pb-20 md:pb-6">
      <div className="px-6 pt-6 pb-6">
        <div className="animate-pulse space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <LoadingSkeleton className="w-8 h-8 rounded-full" />
            <LoadingSkeleton className="h-6 w-32" />
          </div>
          
          {/* Trip overview card */}
          <div className="p-6 bg-background rounded-2xl shadow-card space-y-4">
            <LoadingSkeleton className="h-5 w-24" />
            <div className="text-center space-y-2">
              <LoadingSkeleton className="h-16 w-32 mx-auto" />
              <LoadingSkeleton className="h-4 w-40 mx-auto" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-1">
                  <LoadingSkeleton className="h-3 w-12 mx-auto" />
                  <LoadingSkeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Sectors */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-background rounded-xl shadow-soft">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <LoadingSkeleton className="w-6 h-6 rounded-full" />
                    <div className="space-y-1">
                      <LoadingSkeleton className="h-4 w-28" />
                      <LoadingSkeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <LoadingSkeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
