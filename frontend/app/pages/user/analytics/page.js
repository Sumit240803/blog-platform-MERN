"use client"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import getToken from "@/app/utils/getToken";


// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BlogLikesOverTime = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const token = getToken();
    const fetchBlogData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/blogs-over-time`,{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    }
      ); // Adjust the URL to your route
      const data = await response.json();

      if (data && data.blogs) {
        const blogs = data.blogs;
        const labels = blogs.map(blog => new Date(blog.createdAt).toLocaleDateString()); // X-axis labels (dates)
        const likesData = blogs.map(blog => blog.likes); // Y-axis data (likes)

        setChartData({
          labels,
          datasets: [
            {
              label: "Likes over Time",
              data: likesData,
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    };

    fetchBlogData();
  }, []);

  return (
    <div>
      <h2>Blog Likes Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default BlogLikesOverTime;
