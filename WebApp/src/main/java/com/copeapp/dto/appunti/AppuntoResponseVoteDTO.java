package com.copeapp.dto.appunti;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppuntoResponseVoteDTO {
	
	private int likes;
	
	private int dislikes;
	
	private Boolean yourVote;
}
