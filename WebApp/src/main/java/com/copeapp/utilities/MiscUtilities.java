package com.copeapp.utilities;

import com.copeapp.entities.common.Role;
import org.apache.commons.imaging.ImageReadException;
import org.apache.commons.imaging.Imaging;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MiscUtilities {
	
	public static boolean checkRoles(List<Role> roles0, List<Role> roles1) {
		for (Role r : roles0) {
			if (r.getRole().equalsIgnoreCase("admin")) {
				return true;
			}
		}

		ArrayList<Role> commonRole = new ArrayList<Role>(roles0);
		commonRole.retainAll(roles1);
		if (!commonRole.isEmpty()) {
			return true;
		}
		return false;
	}
	
	public static boolean isRole(List<Role> roles, String role) {
		for (Role r : roles) {
			if (r.getRole().equalsIgnoreCase(role)) {
				return true;
			}
		}
		return false;
	}
	
	public static boolean isAdmin(List<Role> roles) {
		for (Role r : roles) {
			if (r.getRole().equalsIgnoreCase("amministratore")) {
				return true;
			}
		}
		return false;
	}
	
	public static String resizeImage(String image, int maxWidth, int maxHeight) throws IOException, ImageReadException {
		
		//TODO capire perchè con certe immagini diventano i colori negativi
		Pattern regex = Pattern.compile("(?<=data:image\\/)(.*)(?=;base64,)");
		Matcher m = regex.matcher(image);
		String type = "";
		if (m.find()) {
			type = m.group(1);
		} else if (image.isEmpty()) {
			return image;
		} else {
			throw new IOException("base64 bad formatted");
		}
		byte[] imageBta = Base64.getDecoder().decode(image.substring(image.indexOf(',')+1));
		
		BufferedImage img = Imaging.getBufferedImage(imageBta);
		
//		BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBta));
		
		double originalHeight = (double)img.getHeight();
		double originalWidth = (double)img.getWidth();
		double ratioHeight = maxHeight/originalHeight;
		double ratioWidth = maxWidth/originalWidth;
		Image imgScaled = null;
		BufferedImage scaledImage = null;
		
		if (ratioHeight < 1 || ratioWidth < 1) {
			if (ratioHeight < 1 && ratioWidth >= 1) {
				imgScaled = img.getScaledInstance((int)Math.ceil(originalWidth*ratioHeight), (int)Math.ceil(originalHeight*ratioHeight), Image.SCALE_SMOOTH);
				scaledImage = new BufferedImage((int)Math.ceil(originalWidth*ratioHeight), (int)Math.ceil(originalHeight*ratioHeight), BufferedImage.TYPE_INT_ARGB);
			} else if (ratioWidth < 1 && ratioHeight >= 1) {
				imgScaled = img.getScaledInstance((int)Math.ceil(originalWidth*ratioWidth), (int)Math.ceil(originalHeight*ratioWidth), Image.SCALE_SMOOTH);
				scaledImage = new BufferedImage((int)Math.ceil(originalWidth*ratioWidth), (int)Math.ceil(originalHeight*ratioWidth), BufferedImage.TYPE_INT_ARGB);
			} else if (ratioHeight < 1 && ratioWidth < 1) {
				if (ratioHeight <= ratioWidth) {
					imgScaled = img.getScaledInstance((int)Math.ceil(originalWidth*ratioHeight), (int)Math.ceil(originalHeight*ratioHeight), Image.SCALE_SMOOTH);
					scaledImage = new BufferedImage((int)Math.ceil(originalWidth*ratioHeight), (int)Math.ceil(originalHeight*ratioHeight), BufferedImage.TYPE_INT_ARGB);
				} else {
					imgScaled = img.getScaledInstance((int)Math.ceil(originalWidth*ratioWidth), (int)Math.ceil(originalHeight*ratioWidth), Image.SCALE_SMOOTH);
					scaledImage = new BufferedImage((int)Math.ceil(originalWidth*ratioWidth), (int)Math.ceil(originalHeight*ratioWidth), BufferedImage.TYPE_INT_ARGB);
				}
			}
		} else {
			imgScaled = img.getScaledInstance((int)Math.ceil(originalWidth), (int)Math.ceil(originalHeight), Image.SCALE_SMOOTH);
			scaledImage = new BufferedImage((int)Math.ceil(originalWidth), (int)Math.ceil(originalHeight), BufferedImage.TYPE_INT_ARGB);
		}
		
		Graphics2D g2d = scaledImage.createGraphics();
	    g2d.drawImage(imgScaled, 0, 0, null);
	    g2d.dispose();
	    
	    ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    System.out.println("type --> "+type);
	    ImageIO.write(scaledImage, "png", baos);
	    
	    return "data:image/png;base64,"+Base64.getEncoder().encodeToString(baos.toByteArray());
	}
}