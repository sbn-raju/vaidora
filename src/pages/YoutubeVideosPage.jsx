import React, { useState, useEffect } from 'react'
import {useMutation, useQuery} from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from 'react-hot-toast';
import {useQueryClient} from '@tanstack/react-query'
import DeleteIcon from '@mui/icons-material/Delete';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CommonHeader from '../components/CommonHeader';
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../slices/adminSlice';


const YoutubeVideosPage = () => {
  document.title = "Youtube Videos | Admin"
  const [videoType, setVideoType] = useState('youtube');
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  //Youtube videos
  const fetchYouTubeVideos = async()=>{

    

    try {
      const response = await axios.get("/api/v1/youtube/get/videos")
      return response.data.data  
    } catch (error) {
      if(isValidToken(error)){
        dispatch(logoutAdmin())
      }else{
        console.log(error)
        return Promise.reject(error);
      }
    }
  } 

  const {data: fetchedYoutubeVideos} = useQuery({
    queryKey:['fetchedYoutubeVideos'],
    queryFn:fetchYouTubeVideos,
  })

  console.log(fetchedYoutubeVideos);


  // Setting the Link of the Iframe for the Youtube Video 
  const setYoutube = async(link)=>{
   try {
     const response = await axios.post("/api/v1/youtube/video", link)
     return response
   } catch (error) {
    return Promise.reject(error);
   }
  }

  const setYoutubeVideos = useMutation({
    mutationFn:setYoutube,
    onSuccess: async()=>{
      return await queryClient.invalidateQueries({queryKey:['fetchedYoutubeVideos']})
    },
    onError:async(error)=>{
      toast.error(error.response.data.message);
    }
  })

  const onSubmitForYoutube = (link) =>{
    console.log(link);
    setYoutubeVideos.mutate(link)
  }

  useEffect(() => {
    if(setYoutubeVideos.isSuccess){
     toast.success("Video SuccessFully created")
     reset()
    }
    else if(setYoutubeVideos.isError) {
     toast.error("Videos are not set")
    }
 }, [setYoutubeVideos.isSuccess, setYoutubeVideos.isError, reset])
 

 const deletePrevYoutube = async(id)=>{
  try {
    const response = await axios.delete(`/api/v1/youtube/video/?id=${id}`)
    return response
  } catch (error) {
    return Promise.reject(error);
  }
 }

 const deleteYoutubeVideo = useMutation({
  mutationFn:deletePrevYoutube,
  onSuccess:async()=>{
    return await queryClient.invalidateQueries({queryKey:['fetchedYoutubeVideos']}) 
  },
  onError:async(error)=>{
    toast.error(error.response.data.message);
  }
 })

 console.log(deleteYoutubeVideo);

 const handleDeleteYoutube = (id)=>{
   deleteYoutubeVideo.mutate(id)
 }

 useEffect(() => {
  if(deleteYoutubeVideo.isSuccess){
   toast.success("Successfully deleted the Youtube Video")
  }
  else if(deleteYoutubeVideo.isError) {
   toast.error("Youtube Video is not deleted")
  }
}, [deleteYoutubeVideo.isSuccess, deleteYoutubeVideo.isError])
 







  //Testimonials 
  const fetchTestimonialVideos = async()=>{
   try {
     const response = await axios.get("/api/v1/youtube/get/testimonials")
     return response.data.data  
   } catch (error) {
    if(isValidToken(error)){
      dispatch(logoutAdmin())
    }else{
      console.log(error)
      return Promise.reject(error);
    }
   }
  }

  const {data: fetchedTestimonialsVideos} = useQuery({
    queryKey:['fetchedTestimonialsVideos'],
    queryFn:fetchTestimonialVideos
  })

  console.log(fetchedTestimonialsVideos);


  // Setting the Link of the Iframe for the testiomonials Video
  const setTestimonials = async(link_test)=>{
    try {
      const response = await axios.post("/api/v1/youtube/testimonials", link_test)
      return response
    } catch (error) {
      return Promise.reject(error);
    }
  }

  const setTestimonialsVideos = useMutation({
    mutationFn:setTestimonials,
    onSuccess: async()=>{
      return await queryClient.invalidateQueries({queryKey:['fetchedTestimonialsVideos']})
    },
    onError:async(error)=>{
      toast.error(error.response.data.message);
    }
  })

  const onSubmitForTestimonials = (link_test) =>{
    console.log(link_test);
    setTestimonialsVideos.mutate(link_test)
  }

  useEffect(() => {
    if(setTestimonialsVideos.isSuccess){
     toast.success("Testimonials SuccessFully created")
     reset()
    }
    else if(setTestimonialsVideos.isError) {
     toast.error("Testimonials are not set")
    }
 }, [setTestimonialsVideos.isSuccess, setTestimonialsVideos.isError, reset])


 const deletetestimonialsYoutube = async(id)=>{
 try {
   const response = await axios.delete(`/api/v1/youtube/testimonials?id=${id}`)
   return response
 } catch (error) {
  return Promise.reject(error);
 }
 }

 const deleteTestimonialsVideo = useMutation({
  mutationFn:deletetestimonialsYoutube,
  onSuccess:async()=>{
    return await queryClient.invalidateQueries({queryKey:['fetchedTestimonialsVideos']}) 
  },
  onError:async(error)=>{
    toast.error(error.response.data.message);
  }
 })

 console.log(deleteTestimonialsVideo);

 const handleDeleteTestimonials = (id)=>{
  deleteTestimonialsVideo.mutate(id)
 }

 useEffect(() => {
  if(deleteTestimonialsVideo.isSuccess){
   toast.success("Successfully deleted the Testimonials Video")
   
  }
  else if(deleteTestimonialsVideo.isError) {
   toast.error("Testimonials Video is not deleted")
  }
}, [deleteTestimonialsVideo.isSuccess, deleteTestimonialsVideo.isError])
 
 
 



  return (
    <div className='h-auto w-full bg-gray-1 flex flex-col justify-center items-center px-8'>
      <div className='w-full'>
        <CommonHeader heading={"Youtube Videos & Testimonials"} icon={<YouTubeIcon/>}/>
      </div>

      <div className='w-full flex justify-center items-center mb-6'>
        <button className={`w-1/2 py-2 shadow-md mx-2 rounded-xl text-medium ${videoType === 'youtube' ? 'bg-green-3 text-white' : 'bg-white text-green-3'}`} onClick={() => setVideoType('youtube')}>Youtube Videos</button>
        <button className={`w-1/2 py-2 shadow-md mx-2 rounded-xl text-medium ${videoType === 'testimonial' ? 'bg-green-3 text-white' : 'bg-white text-green-3'}`} onClick={() => setVideoType('testimonial')}>Testimonials</button>
      </div>

      { videoType === 'youtube' ? (
        <>
          <div className='w-full px-20 bg-white p-8 rounded-2xl shadow-md'>
            <p className='text-lg mb-2'>Youtube Videos&nbsp;<span className='text-red-700'>*</span></p>
            <form onSubmit={handleSubmit(onSubmitForYoutube)}>
              <input 
               id='link_iframe'
               className='border-[1px] border-green-700 p-4 rounded-xl w-full h-24' placeholder='Copy Iframe from youtube and paste here' 
               {...register("link_iframe",{required:true})}
              />
              <div className='w-full flex justify-end mt-2'>
                <button className='bg-green-3 text-white px-4 py-2 font-medium rounded-xl'><LibraryAddIcon/>&nbsp;Add YT Video</button>
              </div>
            </form>
          </div>

          <div className='w-full rounded-2xl shadow-md bg-white my-6 pb-4 overflow-x-auto admin-scrollbar'>
            <div className='pt-4 sticky top-0 z-10 bg-white border-b-[1px] border-b-gray-2'>
              <ul className='grid grid-cols-2 p-4'>
                <li className='mx-auto'>Video</li>
                <li className='mx-auto'>Operation</li>
              </ul>
            </div>
            <div className='overflow-auto scrollbar h-52'>
              {fetchedYoutubeVideos?.map((vid, index) => (
                <div key={index} className='grid grid-cols-2 p-4'>
                  <iframe width="300" height="200" src={vid.link_iframe} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                  className='mx-auto'>
                  </iframe>
                  <button className='m-auto bg-red-500 text-white px-4 py-2 font-medium rounded-xl hover:bg-red-700' key={vid.id} onClick={()=>handleDeleteYoutube(vid.id)}>
                  <DeleteIcon/>&nbsp;Delete YT Video
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='w-full px-20 bg-white p-8 rounded-2xl shadow-md'>
            <p className='text-lg mb-2'>Testimonial Videos&nbsp;<span className='text-red-700'>*</span></p>
            <form onSubmit={handleSubmit(onSubmitForTestimonials)}>
              <input className='border-[1px] border-green-700 p-4 rounded-xl w-full h-24' placeholder='Copy Iframe of the testimonial and paste here' 
              {...register("links_iframe_testimonials",{required:true})}
              />
              <div className='w-full flex justify-end mt-2'>
                <button className='bg-green-3 text-white px-4 py-2 font-medium rounded-xl'><ContactMailIcon/>&nbsp;Add Testimonial</button>
              </div>
            </form>
          </div>

          <div className='w-full rounded-2xl shadow-md bg-white my-6 pb-4 overflow-x-auto admin-scrollbar'>
            <div className='pt-4 sticky top-0 z-10 bg-white border-b-[1px] border-b-gray-2'>
              <ul className='grid grid-cols-2 pb-2'>
                <li className='mx-auto'>Video</li>
                <li className='mx-auto'>Operation</li>
              </ul>
            </div>
            <div className='overflow-auto scrollbar h-52'>
              {fetchedTestimonialsVideos?.map((vid, index) => (
                <div key={index} className='grid grid-cols-2 p-4'>
                  <iframe width="300" height="200" src={vid.links_iframe_testimonials} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
                  className='mx-auto'>
                  </iframe>
                  <button className='m-auto bg-red-500 text-white px-4 py-2 font-medium rounded-xl hover:bg-red-700' key={vid.id} onClick={()=>handleDeleteTestimonials(vid.id)}>
                  <DeleteIcon/>&nbsp;Delete Testimonial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )
      }
    </div>
  )
}

export default YoutubeVideosPage