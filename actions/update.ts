"use server"
import client from '@/app/db';

export default async function update(selectedContestant: string,selectedOption : number, updatedVotes: number[]) {
    await client.contestant.updateMany({
        where: {
          Name: selectedContestant
        },
        data: {
          Votes: updatedVotes[selectedOption],
        },
      });
}