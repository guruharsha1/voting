"use client"  
import { useEffect, useState } from 'react';
import prisma from '@/app/db';
import update from '../actions/update';
import getDetails from '@/actions/details';

const VotingComponent = () => {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedContestant, setSelectedContestant] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await getDetails();
        if (!response.length) {
          throw new Error('Network response was not ok');
        }
        setVotes(response.map((vote) => vote.Votes));
        setOptions(response.map((vote) => vote.Name));

      } catch (error) {
        console.error('Error fetching votes:', error);
      } 
    };

    fetchVotes();
  }, []);

  const handleVote = async () => {
    if (selectedOption !== null) {
      const updatedVotes = [...votes];
      updatedVotes[selectedOption] += 1;
      await update(selectedContestant);
      setVotes(updatedVotes);
    }
  };

  const handleChange = (index) => {
    setSelectedOption(index);
    setSelectedContestant(options[index]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Vote for Your Favorite Option</h1>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="radio"
              id={`option-${index}`}
              name="vote"
              value={index}
              checked={selectedOption === index}
              onChange={() => { handleChange(index) }}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
      >
        Submit Vote
      </button>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Results</h2>
        <ul className="list-disc pl-5">
          {options.map((option, index) => (
            <li key={index} className="text-lg">
              {option}: {votes[index]} vote(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VotingComponent;
