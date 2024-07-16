import React from 'react'

export const runtime = "edge";

type Props = {}

export default function TierListPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">
        This feature is under construction, check back soon!
      </h1>
      <div className="text-9xl">
        🚧
      </div>
    </div>
  )
}
