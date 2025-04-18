import { ChevronLeft, Camera, Upload, X } from "lucide-react"
import BottomNav from "../components/BottomNav"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState, useRef, useEffect } from "react"
import Webcam from "react-webcam"
import { createSosReport } from "../services/sosService";
import { getCurrentUser } from "../services/authService"

function NewSos() {
     const { register, handleSubmit, formState: { errors } } = useForm();
     const [proofs, setProofs] = useState([]);
     const [showCamera, setShowCamera] = useState(false);
     const webcamRef = useRef(null);
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [location, setLocation] = useState(null);

     useEffect(() => {
          if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(
                    (pos) => {
                         setLocation([pos.coords.latitude, pos.coords.longitude]);
                    },
                    (err) => {
                         setLocation(null);
                    }
               );
          }
     }, []);

     const onSubmit = async (data) => {
          try {
               setLoading(true);
               const formData = {
                    ...data,
                    proofs,
                    location,
                    user: getCurrentUser()._id
               };

               await createSosReport(formData);
               navigate('/sos/reports');
          } catch (error) {
               console.error("Error creating SOS report:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleFileUpload = (e) => {
          const files = Array.from(e.target.files);
          const newProofs = files.map(file => ({
               type: file.type.startsWith('image') ? 'image' : 'video',
               url: URL.createObjectURL(file),
               file
          }));
          setProofs([...proofs, ...newProofs]);
     };

     const captureImage = () => {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
               setProofs([...proofs, { type: 'image', url: imageSrc }]);
               setShowCamera(false);
          }
     };

     const removeProof = (index) => {
          setProofs(proofs.filter((_, i) => i !== index));
     };

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-base-200'>
                    <div className='flex gap-3'>
                         <Link to="/" className='bg-base-100 p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">New Emergency</h3>
                    </div>
               </div>

               <div className="p-4 mb-24">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                         {/* Title Input */}
                         <div className="form-control w-full">
                              <label className="label">
                                   <span className="label-text">Emergency Title</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="Enter emergency title"
                                   className="input input-bordered w-full"
                                   {...register("title", { required: "Title is required" })}
                              />
                              {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                         </div>

                         {/* Emergency Type Select */}
                         <div className="form-control w-full">
                              <label className="label">
                                   <span className="label-text">Emergency Type</span>
                              </label>
                              <select
                                   className="select select-bordered w-full"
                                   {...register("sos_type", { required: "Please select emergency type" })}
                              >
                                   <option value="">Select type</option>
                                   <option value="medical">Medical</option>
                                   <option value="fire">Fire</option>
                                   <option value="accident">Accident</option>
                                   <option value="violence">Violence</option>
                                   <option value="disaster">Natural Disaster</option>
                                   <option value="rescue">Rescue</option>
                              </select>
                              {errors.sos_type && <span className="text-error text-sm mt-1">{errors.sos_type.message}</span>}
                         </div>

                         {/* Description Textarea */}
                         <div className="form-control w-full">
                              <label className="label">
                                   <span className="label-text">Description</span>
                              </label>
                              <textarea
                                   className="textarea textarea-bordered h-24 w-full"
                                   placeholder="Describe the emergency..."
                                   {...register("description", { required: "Description is required" })}
                              ></textarea>
                              {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                         </div>

                         {/* Proof Upload Section */}
                         <div className="space-y-4">
                              <label className="label">
                                   <span className="label-text">Add Proof</span>
                              </label>

                              {/* Media Preview */}
                              {proofs.length > 0 && (
                                   <div className="grid grid-cols-2 gap-2">
                                        {proofs.map((proof, index) => (
                                             <div key={index} className="relative">
                                                  {proof.type === 'image' ? (
                                                       <img src={proof.url} alt="proof" className="w-full h-32 object-cover rounded-lg" />
                                                  ) : (
                                                       <video src={proof.url} className="w-full h-32 object-cover rounded-lg" controls />
                                                  )}
                                                  <button
                                                       type="button"
                                                       onClick={() => removeProof(index)}
                                                       className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                                                  >
                                                       <X className="w-4 h-4 text-white" />
                                                  </button>
                                             </div>
                                        ))}
                                   </div>
                              )}

                              {/* Camera View */}
                              {showCamera && (
                                   <div className="relative">
                                        <Webcam
                                             ref={webcamRef}
                                             screenshotFormat="image/jpeg"
                                             className="w-full rounded-lg"
                                        />
                                        <div className="flex justify-center gap-2 mt-2">
                                             <button
                                                  type="button"
                                                  onClick={captureImage}
                                                  className="btn btn-primary"
                                             >
                                                  Capture
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() => setShowCamera(false)}
                                                  className="btn btn-ghost"
                                             >
                                                  Cancel
                                             </button>
                                        </div>
                                   </div>
                              )}

                              {/* Upload Buttons */}
                              <div className="flex gap-2">
                                   <label className="btn btn-outline flex-1">
                                        <Upload className="w-4 h-4" />
                                        Upload Media
                                        <input
                                             type="file"
                                             accept="image/*,video/*"
                                             multiple
                                             className="hidden"
                                             onChange={handleFileUpload}
                                        />
                                   </label>
                                   <button
                                        type="button"
                                        onClick={() => setShowCamera(true)}
                                        className="btn btn-outline flex-1"
                                   >
                                        <Camera className="w-4 h-4" />
                                        Use Camera
                                   </button>
                              </div>
                         </div>

                         {/* Submit Button */}
                         <button type="submit" className="btn btn-primary btn-block">
                              Report Emergency
                         </button>
                    </form>
               </div>

               <BottomNav />
          </>
     )
}

export default NewSos
