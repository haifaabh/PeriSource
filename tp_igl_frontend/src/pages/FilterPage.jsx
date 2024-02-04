import React from 'react'
import decoFilter from '../assets/decoFilter.svg'
import calendarIcon from '../assets/calendarIcon.svg'
import { useState } from 'react';
import addButton from '../assets/addButton.svg'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


    export const FilterPage = ({ isVisible, onClose ,onApplyFilter}) => {
        const [authors, setAuthors] = useState([""]);
        const [institutions, setinstitutions] = useState([""]);
        const [keywords, setkeywords] = useState([""]);
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);

        if (!isVisible) return null;
        const handleClose = (e) => {
          if (e.target.id === 'wrapper') {
            onClose();
          }
        };


        const handleAddAuthor = () => {
          if (authors[authors.length - 1] !== '') {
          setAuthors([...authors, '']);
          }
        };
        const handleAddkeyWords = () => {
          if (keywords[keywords.length - 1] !== '') {
            setkeywords([...keywords, '']);
          }
        };
        const handleAddInstitution = () => {
          if (institutions[institutions.length - 1] !== '') {
            setinstitutions([...institutions, '']);
          }
        };

        const handleRemoveAuthor = (index) => {
          const updatedAuthors = [...authors];
          updatedAuthors.splice(index, 1);
          setAuthors(updatedAuthors);
        };
        const handleRemoveInstitution = (index) => {
            const updatedInstitutions = [...institutions];
            updatedInstitutions.splice(index, 1);
            setinstitutions(updatedInstitutions);
        };
        const handleRemoveKeywords = (index) => {
            const updatedKeywords = [...keywords];
            updatedKeywords.splice(index, 1);
            setkeywords(updatedKeywords);
        };
      
        const handleInstitutionChange = (index, value) => {
          const updatedInstitutions = [...institutions];
          updatedInstitutions[index] = value;
          setinstitutions(updatedInstitutions);
        };
        const handleAuthorChange = (index, value) => {
            const updatedAuthors = [...authors];
            updatedAuthors[index] = value;
            setAuthors(updatedAuthors);
        };
        const handleKeywordChange = (index, value) => {
            const updatedKeywords = [...keywords];
            updatedKeywords[index] = value;
            setkeywords(updatedKeywords);
        };

        const handleDelete = () => {
          setAuthors(['']);
          setinstitutions(['']);
          setkeywords(['']);
          setStartDate(null);
          setEndDate(null);
        };

      
        const handleApplyFilter = (e) => {
          const nonEmptyKeywords = keywords.filter(keyword => keyword.trim() !== "");
          const nonEmptyAuthors= authors.filter(author => author.trim() !== "");
          const nonEmptyInst= institutions.filter(institution => institution.trim() !== "");
          const startD = startDate;
          const endD = endDate;
          console.log("instt",nonEmptyInst)
          e.preventDefault();
          onApplyFilter({ authors: nonEmptyAuthors , institutions : nonEmptyInst, keywords : nonEmptyKeywords, startDate :startD, endDate : endD });
          onClose();
        };
      
        return (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
            id="wrapper"
            onClick={handleClose}
          >
         <div className="w-[400px] md:w-[600px] flex flex-col relative">
            <div className="w-[400px] md:w-[600px] flex flex-col relative">
              <div className="bg-white rounded">
                <button
                  className="absolute top-2 right-2 px-2 rounded-full text-gray-600 bg-white hover:bg-gray-50 hover:text-white p-1 hover:hover:bg-slate-400"
                  onClick={() => onClose()}
                >X</button>
                
                <div className="borderbottomUser p-6">
                  <h1
                    className="text-xl max-w-[600px] font-montserrat text-[#002366] font-semibold"
                  >
                    Filter your results
                  </h1>
                  <img src={decoFilter} alt="" />
                </div>
                <div className="overflow-y-auto max-h-[60vh]">
                {/* Authors */}
                <div className='p-6'>
                    <div className="flex items-center">
                        <h4 className="mr-4 text-lg max-w-[600px] font-montserrat text-[#002366] font-semibold ml-4">
                            Authors
                        </h4>
                        <button onClick={handleAddAuthor} className="rounded-full button-hover"><img src={addButton} alt="" /></button>
                    </div>
                    {authors.map((author, index) => (
                        <div key={index} className="flex mb-2">
                        <label className="sr-only" htmlFor={`author-input-${index}`}>
                            Author Name
                        </label>
                        <input
                            type="text"
                            id={`author-input-${index}`}
                            className="w-full py-2 px-4 border rounded-l-full"
                            value={author}
                            onChange={(e) => handleAuthorChange(index, e.target.value)}
                            placeholder="Enter author name"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveAuthor(index)}
                            className="bg-[#002366] text-white px-4 py-2 rounded-r-full hover:bg-slate-400"
                        >X</button>
                        </div>
                    ))}
                    </div>


                {/* Institutions */}
                <div className='p-6'>
                    <div className="flex items-center">
                        <h4 className="mr-4 text-lg max-w-[600px] font-montserrat text-[#002366] font-semibold ml-4">
                            Institutions
                        </h4>
                        <button onClick={handleAddInstitution} className="rounded-full button-hover"><img src={addButton} alt="" /></button>
                    </div>
                    {institutions.map((institution, index) => (
                        <div key={index} className="flex mb-2">
                        <label className="sr-only" htmlFor={`author-input-${index}`}>
                            institution name
                        </label>
                        <input
                            type="text"
                            id={`institution-input-${index}`}
                            className="w-full  py-2 px-4 border rounded-l-full"
                            value={institution}
                            onChange={(e) => handleInstitutionChange(index, e.target.value)}
                            placeholder="Enter Institution name"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveInstitution(index)}
                            className="bg-[#002366] text-white px-4 py-2 rounded-r-full hover:bg-slate-400"
                        >X</button>
                        </div>
                    ))}
                    </div>


                    {/* Key words */}
                <div className='p-6'>
                    <div className="flex items-center">
                        <h4 className="mr-4 text-lg max-w-[600px] font-montserrat text-[#002366] font-semibold ml-4">
                            Key words
                        </h4>
                        <button onClick={handleAddkeyWords} className="rounded-full button-hover"><img src={addButton} alt="" /></button>
                    </div>
                    {keywords.map((keyword, index) => (
                        <div key={index} className="flex mb-2">
                        <label className="sr-only" htmlFor={`keyword-input-${index}`}>
                            key word
                        </label>
                        <input
                            type="text"
                            id={`keyword-input-${index}`}
                            className="w-full py-2 px-4 border rounded-l-full"
                            value={keyword}
                            onChange={(e) => handleKeywordChange(index, e.target.value)}
                            placeholder="Enter a key word"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveKeywords(index)}
                            className="bg-[#002366] text-white px-4 py-2 rounded-r-full hover:bg-slate-400"
                        >X</button>
                        </div>
                    ))}
                </div>
              {/* Period */}
            <div className="p-6">
              <div className="flex items-center">
                <h4 className="mr-4 text-lg max-w-[600px] font-montserrat text-[#002366] font-semibold ml-4">
                  Period
                </h4>
              <div className="flex space-x-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd" // Change the date format to display year, month, and day
                className="date-picker-input w-[100px] md:w-full"
                placeholderText="Start"
                portal={document.body}
              />

              <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd" // Change the date format to display year, month, and day
                  className="date-picker-input w-[100px] md:w-full"
                  placeholderText="End"
                  portal={document.body}
              />
              </div>
            </div>
        </div>
        </div>

            
      <div className='borderTopUser flex justify-end pr-4 pb-4'>
          <button
              type="submit"  
              className="bg-[#ABBED1] text-white p-2 px-6 rounded-full mt-4 mr-4 hover:bg-gray-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          <button
              type="submit"
            className="bg-[#0979D0] text-white p-2 px-6 rounded-full mt-4 hover:bg-gray-700"
            onClick={handleApplyFilter}
          >
            Apply
          </button>

      </div>
      </div>

              </div>
            </div>
          </div>
        );
      };
